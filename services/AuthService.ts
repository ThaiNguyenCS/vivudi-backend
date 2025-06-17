import { injectable, inject } from 'tsyringe';
import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import AppError from '../errors/AppError';
import { RegisterStatus, LoginStatus, ForgotPasswordStatus, VerifyOTPStatus, ResetPasswordStatus, ChangePasswordStatus } from '../statusCodes/authStatusCode';
import AuthRepository from '../repository/Auth.repository';
import EmailService from './EmailService';
import { generateOTP, generateUUID } from '../utils/genEmail';

@injectable()
class AuthService {
    constructor(
        @inject('AuthRepository')
        private authRepository: AuthRepository,
        @inject('EmailService')
        private emailService: EmailService
    ) {}

    async register(email: string, phoneNumber: string, password: string) {
        // Check if email exists
        const existingEmail = await this.authRepository.findByEmail(email);
        if (existingEmail) {
            throw new AppError(RegisterStatus.EMAIL_EXISTS.code, RegisterStatus.EMAIL_EXISTS.message);
        }

        // Check if phone number exists
        const existingPhone = await this.authRepository.findByPhoneNumber(phoneNumber);
        if (existingPhone) {
            throw new AppError(RegisterStatus.PHONE_EXISTS.code, RegisterStatus.PHONE_EXISTS.message);
        }

        // Validate password strength
        if (password.length < 8) {
            throw new AppError(RegisterStatus.WEAK_PASSWORD.code, RegisterStatus.WEAK_PASSWORD.message);
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user
        const user = await this.authRepository.create({
            id: uuidv4(),
            email,
            phoneNumber,
            password: hashedPassword
        });
        return {
            statusCode: RegisterStatus.SUCCESS.code,
            message: RegisterStatus.SUCCESS.message,
            data: null
        };
    }

    async login(email: string, password: string) {
        // Validate input
        if (!email || !password) {
            throw new AppError(LoginStatus.MISSING_CREDENTIALS.code, LoginStatus.MISSING_CREDENTIALS.message);
        }

        // Find user by email
        const user = await this.authRepository.findByEmail(email);
        if (!user) {
            throw new AppError(LoginStatus.INVALID_CREDENTIALS.code, LoginStatus.INVALID_CREDENTIALS.message);
        }

        // Verify password
        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) {
            throw new AppError(LoginStatus.INVALID_CREDENTIALS.code, LoginStatus.INVALID_CREDENTIALS.message);
        }

        // Generate JWT token with id, email, and role
        const token = jwt.sign(
            { id: user.id, email: user.email, role: user.role },
            process.env.JWT_SECRET_KEY || 'your-secret-key',
            { expiresIn: '24h' }
        );

        return {
            statusCode: LoginStatus.SUCCESS.code,
            message: LoginStatus.SUCCESS.message,
            data: { token }
        };
    }

    async forgotPassword(email: string) {
        // Check if email exists
        const user = await this.authRepository.findByEmail(email);
        if (!user) {
            throw new AppError(ForgotPasswordStatus.EMAIL_NOT_FOUND.code, ForgotPasswordStatus.EMAIL_NOT_FOUND.message);
        }

        // Generate OTP
        const otp = generateOTP();
        const expiresAt = new Date(Date.now() + 5 * 60 * 1000);
        expiresAt.setHours(expiresAt.getHours() + 7);
        
        // Save OTP to database
        await this.authRepository.createPasswordReset({
            id: generateUUID(),
            email,
            otp,
            expiresAt
        });

        // Send OTP email
        await this.emailService.sendPasswordResetEmail(email, otp);

        return {
            statusCode: ForgotPasswordStatus.SUCCESS.code,
            message: ForgotPasswordStatus.SUCCESS.message,
            data: null
        };
    }

    async verifyOTP(otp: string) {
        // Find OTP
        const resetRecord = await this.authRepository.findPasswordResetByOTP(otp);
        if (!resetRecord) {
            throw new AppError(VerifyOTPStatus.INVALID_OTP.code, VerifyOTPStatus.INVALID_OTP.message);
        }

        // Check if OTP is expired
        if (resetRecord.expiresAt < new Date()) {
            throw new AppError(VerifyOTPStatus.EXPIRED_OTP.code, VerifyOTPStatus.EXPIRED_OTP.message);
        }

        // Check if OTP is already used
        if (resetRecord.used) {
            throw new AppError(VerifyOTPStatus.OTP_ALREADY_USED.code, VerifyOTPStatus.OTP_ALREADY_USED.message);
        }

        return {
            statusCode: VerifyOTPStatus.SUCCESS.code,
            message: VerifyOTPStatus.SUCCESS.message,
            data: { email: resetRecord.email }
        };
    }

    async resetPassword(otp: string, newPassword: string) {
        // Find OTP
        const resetRecord = await this.authRepository.findPasswordResetByOTP(otp);
        if (!resetRecord) {
            throw new AppError(ResetPasswordStatus.INVALID_OTP.code, ResetPasswordStatus.INVALID_OTP.message);
        }

        // Check if OTP is expired
        if (resetRecord.expiresAt < new Date()) {
            throw new AppError(ResetPasswordStatus.EXPIRED_OTP.code, ResetPasswordStatus.EXPIRED_OTP.message);
        }

        // Check if OTP is already used
        if (resetRecord.used) {
            throw new AppError(ResetPasswordStatus.OTP_ALREADY_USED.code, ResetPasswordStatus.OTP_ALREADY_USED.message);
        }

        // Validate password strength
        if (newPassword.length < 8) {
            throw new AppError(ResetPasswordStatus.WEAK_PASSWORD.code, ResetPasswordStatus.WEAK_PASSWORD.message);
        }

        // Hash new password
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        // Update user password
        await this.authRepository.updatePassword(resetRecord.email, hashedPassword);

        // Mark OTP as used
        await this.authRepository.markPasswordResetAsUsed(otp);

        // Send success email
        await this.emailService.sendPasswordResetSuccessEmail(resetRecord.email);

        return {
            statusCode: ResetPasswordStatus.SUCCESS.code,
            message: ResetPasswordStatus.SUCCESS.message,
            data: null
        };
    }

    async changePassword(userId: string, currentPassword: string, newPassword: string) {
        // Find user by ID
        const user = await this.authRepository.findById(userId);
        if (!user) {
            throw new AppError(LoginStatus.INVALID_CREDENTIALS.code, LoginStatus.INVALID_CREDENTIALS.message);
        }

        if (!user.password) {
            throw new AppError(ChangePasswordStatus.INVALID_DATA.code, 'User has no password set');
        }
        
        // Validate current password
        const isValidCurrentPassword = await bcrypt.compare(currentPassword, user.password);
        if (!isValidCurrentPassword) {
            throw new AppError(ChangePasswordStatus.INVALID_CURRENT_PASSWORD.code, ChangePasswordStatus.INVALID_CURRENT_PASSWORD.message);
        }

        // Validate new password strength
        if (newPassword.length < 8) {
            throw new AppError(ChangePasswordStatus.WEAK_PASSWORD.code, ChangePasswordStatus.WEAK_PASSWORD.message);
        }

        // Hash new password
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        // Update user password
        await this.authRepository.updatePasswordById(userId, hashedPassword);

        return {
            statusCode: ChangePasswordStatus.SUCCESS.code,
            message: ChangePasswordStatus.SUCCESS.message,
            data: null
        };
    }
}

export default AuthService;