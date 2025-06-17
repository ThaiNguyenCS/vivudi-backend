import { injectable } from 'tsyringe';
import Auth from '../models/Auth.model';
import PasswordReset from '../models/PasswordReset.model';
import { StatusCodes, StatusMessages } from '../statusCodes/databaseStatusCode';
import AppError from '../errors/AppError';

@injectable()
class AuthRepository {
    async findByEmail(email: string) {
        try {
            return await Auth.findOne({ where: { email } });
        } catch (error) {
            throw new AppError(
                StatusCodes.DATABASE_ERROR,
                `Error finding user by email: ${error instanceof Error ? error.message : 'Unknown error'}`
            );
        }
    }

    async findByPhoneNumber(phoneNumber: string) {
        try {
            return await Auth.findOne({ where: { phoneNumber } });
        } catch (error) {
            throw new AppError(
                StatusCodes.DATABASE_ERROR,
                `Error finding user by phone number: ${error instanceof Error ? error.message : 'Unknown error'}`
            );
        }
    }

    async findById(id: string) {
        try {
            return await Auth.findOne({ where: { id } });
        } catch (error) {
            throw new AppError(
                StatusCodes.DATABASE_ERROR,
                `Error finding user by ID: ${error instanceof Error ? error.message : 'Unknown error'}`
            );
        }
    }

    async create(userData: {
        id: string;
        email: string;
        phoneNumber: string;
        password: string;
    }) {
        try {
            return await Auth.create({ ...userData, role: 'user' });
        } catch (error) {
            throw new AppError(
                StatusCodes.DATABASE_ERROR,
                `Error creating user: ${error instanceof Error ? error.message : 'Unknown error'}`
            );
        }
    }

    async updatePassword(email: string, hashedPassword: string) {
        try {
            return await Auth.update(
                { password: hashedPassword },
                { where: { email } }
            );
        } catch (error) {
            throw new AppError(
                StatusCodes.DATABASE_ERROR,
                `Error updating password: ${error instanceof Error ? error.message : 'Unknown error'}`
            );
        }
    }

    async updatePasswordById(id: string, hashedPassword: string) {
        try {
            return await Auth.update(
                { password: hashedPassword },
                { where: { id } }
            );
        } catch (error) {
            throw new AppError(
                StatusCodes.DATABASE_ERROR,
                `Error updating password by ID: ${error instanceof Error ? error.message : 'Unknown error'}`
            );
        }
    }

    async createPasswordReset(resetData: {
        id: string;
        email: string;
        otp: string;
        expiresAt: Date;
    }) {
        try {
            return await PasswordReset.create(resetData);
        } catch (error) {
            throw new AppError(
                StatusCodes.DATABASE_ERROR,
                `Error creating password reset: ${error instanceof Error ? error.message : 'Unknown error'}`
            );
        }
    }

    async findPasswordResetByOTP(otp: string) {
        try {
            return await PasswordReset.findOne({ where: { otp } });
        } catch (error) {
            throw new AppError(
                StatusCodes.DATABASE_ERROR,
                `Error finding password reset by OTP: ${error instanceof Error ? error.message : 'Unknown error'}`
            );
        }
    }

    async markPasswordResetAsUsed(otp: string) {
        try {
            return await PasswordReset.update(
                { used: true },
                { where: { otp } }
            );
        } catch (error) {
            throw new AppError(
                StatusCodes.DATABASE_ERROR,
                `Error marking password reset as used: ${error instanceof Error ? error.message : 'Unknown error'}`
            );
        }
    }

    async deleteExpiredPasswordResets() {
        try {
            return await PasswordReset.destroy({
                where: {
                    expiresAt: {
                        [require('sequelize').Op.lt]: new Date()
                    }
                }
            });
        } catch (error) {
            throw new AppError(
                StatusCodes.DATABASE_ERROR,
                `Error deleting expired password resets: ${error instanceof Error ? error.message : 'Unknown error'}`
            );
        }
    }
}

export default AuthRepository; 