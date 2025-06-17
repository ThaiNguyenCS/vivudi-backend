import { v4 as uuidv4 } from 'uuid';
import crypto from 'crypto';

export const generateResetToken = (): string => {
    return crypto.randomBytes(32).toString('hex');
};

export const generateOTP = (): string => {
    // Generate a 6-digit OTP
    return Math.floor(100000 + Math.random() * 900000).toString();
};

export const generateUUID = (): string => {
    return uuidv4();
};

export const createResetEmailContent = (otp: string): string => {
    return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <h2 style="color: #333; text-align: center;">Password Reset OTP</h2>
        <p style="color: #666; line-height: 1.6;">
            You have requested to reset your password. Use the following OTP to proceed with the password reset:
        </p>
        <div style="text-align: center; margin: 30px 0;">
            <div style="background-color: #f8f9fa; border: 2px solid #007bff; border-radius: 10px; padding: 20px; display: inline-block;">
                <h1 style="color: #007bff; font-size: 48px; margin: 0; letter-spacing: 10px; font-family: 'Courier New', monospace;">${otp}</h1>
            </div>
        </div>
        <p style="color: #666; line-height: 1.6;">
            If you didn't request this password reset, please ignore this email. This OTP will expire in 5 minutes.
        </p>
        <p style="color: #999; font-size: 12px; margin-top: 30px; text-align: center;">
            For security reasons, please do not share this OTP with anyone.
        </p>
    </div>
    `;
};

export const createResetSuccessEmailContent = (): string => {
    return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <h2 style="color: #28a745; text-align: center;">Password Reset Successful</h2>
        <p style="color: #666; line-height: 1.6;">
            Your password has been successfully reset. You can now log in with your new password.
        </p>
        <p style="color: #666; line-height: 1.6;">
            If you didn't perform this action, please contact our support team immediately.
        </p>
        <p style="color: #999; font-size: 12px; margin-top: 30px; text-align: center;">
            Thank you for using our service.
        </p>
    </div>
    `;
};
