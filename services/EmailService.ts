import { injectable } from 'tsyringe';
import nodemailer from 'nodemailer';
import logger from '../logger/logger';
import { createResetEmailContent, createResetSuccessEmailContent } from '../utils/genEmail';

@injectable()
class EmailService {
    private transporter: nodemailer.Transporter;

    constructor() {
        // Tạo transporter cho Gmail
        this.transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASSWORD
            }
        });
    }

    async sendPasswordResetEmail(email: string, otp: string): Promise<void> {
        try {
            const mailOptions = {
                from: process.env.EMAIL_USER,
                to: email,
                subject: 'Password Reset OTP',
                html: createResetEmailContent(otp)
            };

            const result = await this.transporter.sendMail(mailOptions);
            logger.info(`Password reset OTP email sent successfully to: ${email}`);
            logger.info(`Message ID: ${result.messageId}`);
        } catch (error) {
            logger.error(`Failed to send password reset OTP email to ${email}: ${error instanceof Error ? error.message : 'Unknown error'}`);
            
            // Fallback: Log email content for testing
            logger.info(`Email would be sent to: ${email}`);
            logger.info(`OTP: ${otp}`);
            logger.info(`Email content: ${createResetEmailContent(otp)}`);
            
            throw error;
        }
    }

    async sendPasswordResetSuccessEmail(email: string): Promise<void> {
        try {
            const mailOptions = {
                from: process.env.EMAIL_USER,
                to: email,
                subject: 'Password Reset Successful',
                html: createResetSuccessEmailContent()
            };

            const result = await this.transporter.sendMail(mailOptions);
            logger.info(`Password reset success email sent successfully to: ${email}`);
            logger.info(`Message ID: ${result.messageId}`);
        } catch (error) {
            logger.error(`Failed to send password reset success email to ${email}: ${error instanceof Error ? error.message : 'Unknown error'}`);
            
            // Fallback: Log email content for testing
            logger.info(`Success email would be sent to: ${email}`);
            logger.info(`Email content: ${createResetSuccessEmailContent()}`);
            
            throw error;
        }
    }
}

export default EmailService; 