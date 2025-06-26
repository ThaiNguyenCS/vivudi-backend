import { injectable, inject } from 'tsyringe';
import { NextFunction, Request, Response } from "express";
import AuthService from "../services/AuthService";
import { registerSchema, loginSchema, forgotPasswordSchema, resetPasswordSchema, verifyOTPSchema, changePasswordSchema } from "../validators/auth.validator";
import { buildNormalResponse, buildErrorResponse } from "../types/ApiResponse";
import { RegisterStatus, LoginStatus, ForgotPasswordStatus, VerifyOTPStatus, ResetPasswordStatus, ChangePasswordStatus } from "../statusCodes/authStatusCode";
import AppError from "../errors/AppError";
import { AuthenticatedRequest } from "../middlewares/authenticate.middleware";

@injectable()
class AuthController {
    constructor(
        @inject('AuthService')
        private authService: AuthService
    ) {}

    async register(req: Request, res: Response, next: NextFunction) {
        try {
            const { error, value } = registerSchema.validate(req.body);
            if (error) {
                // Check if error is related to password validation
                const isPasswordError = error.details[0].message.toLowerCase().includes('password');
                const status = isPasswordError ? RegisterStatus.WEAK_PASSWORD : RegisterStatus.INVALID_DATA;
                
                return res.json(
                    buildErrorResponse(
                        status.message,
                        error.details[0].message,
                        status.code
                    )
                );
            }

            const result = await this.authService.register(
                value.email,
                value.phone_number,
                value.password
            );

            return res.json(
                buildNormalResponse(
                    result.data,
                    result.message,
                    null,
                    result.statusCode
                )
            );
        } catch (error) {
            if (error instanceof AppError) {
                return res.json(
                    buildErrorResponse(
                        error.message,
                        null,
                        error.statusCode
                    )
                );
            }
            next(error);
        }
    }

    async login(req: Request, res: Response, next: NextFunction) {
        try {
            const { error, value } = loginSchema.validate(req.body);
            if (error) {
                // Nếu thiếu email thì trả về MISSING_EMAIL, thiếu password thì trả về MISSING_PASSWORD
                const msg = error.details[0].message.toLowerCase();
                if (msg.includes('email')) {
                    return res.json(
                        buildErrorResponse(
                            LoginStatus.MISSING_EMAIL.message,
                            error.details[0].message,
                            LoginStatus.MISSING_EMAIL.code
                        )
                    );
                } else if (msg.includes('password')) {
                    return res.json(
                        buildErrorResponse(
                            LoginStatus.MISSING_PASSWORD.message,
                            error.details[0].message,
                            LoginStatus.MISSING_PASSWORD.code
                        )
                    );
                }
            }

            const result = await this.authService.login(
                value.email,
                value.password
            );

            return res.json(
                buildNormalResponse(
                    result.data,
                    result.message,
                    null,
                    result.statusCode
                )
            );
        } catch (error) {
            if (error instanceof AppError) {
                return res.json(
                    buildErrorResponse(
                        error.message,
                        null,
                        error.statusCode
                    )
                );
            }
            next(error);
        }
    }

    async forgotPassword(req: Request, res: Response, next: NextFunction) {
        try {
            const { error, value } = forgotPasswordSchema.validate(req.body);
            if (error) {
                return res.json(
                    buildErrorResponse(
                        ForgotPasswordStatus.INVALID_DATA.message,
                        error.details[0].message,
                        ForgotPasswordStatus.INVALID_DATA.code
                    )
                );
            }

            const result = await this.authService.forgotPassword(value.email);

            return res.json(
                buildNormalResponse(
                    result.data,
                    result.message,
                    null,
                    result.statusCode
                )
            );
        } catch (error) {
            if (error instanceof AppError) {
                return res.json(
                    buildErrorResponse(
                        error.message,
                        null,
                        error.statusCode
                    )
                );
            }
            next(error);
        }
    }

    async verifyOTP(req: Request, res: Response, next: NextFunction) {
        try {
            const { error, value } = verifyOTPSchema.validate(req.body);
            if (error) {
                return res.json(
                    buildErrorResponse(
                        VerifyOTPStatus.INVALID_DATA.message,
                        error.details[0].message,
                        VerifyOTPStatus.INVALID_DATA.code
                    )
                );
            }

            const result = await this.authService.verifyOTP(value.otp);

            return res.json(
                buildNormalResponse(
                    result.data,
                    result.message,
                    null,
                    result.statusCode
                )
            );
        } catch (error) {
            if (error instanceof AppError) {
                return res.json(
                    buildErrorResponse(
                        error.message,
                        null,
                        error.statusCode
                    )
                );
            }
            next(error);
        }
    }

    async resetPassword(req: Request, res: Response, next: NextFunction) {
        try {
            const { error, value } = resetPasswordSchema.validate(req.body);
            if (error) {
                return res.json(
                    buildErrorResponse(
                        ResetPasswordStatus.INVALID_DATA.message,
                        error.details[0].message,
                        ResetPasswordStatus.INVALID_DATA.code
                    )
                );
            }

            const result = await this.authService.resetPassword(
                value.otp,
                value.password
            );

            return res.json(
                buildNormalResponse(
                    result.data,
                    result.message,
                    null,
                    result.statusCode
                )
            );
        } catch (error) {
            if (error instanceof AppError) {
                return res.json(
                    buildErrorResponse(
                        error.message,
                        null,
                        error.statusCode
                    )
                );
            }
            next(error);
        }
    }

    async changePassword(req: AuthenticatedRequest, res: Response, next: NextFunction) {
        try {
            const { error, value } = changePasswordSchema.validate(req.body);
            if (error) {
                // Check if error is related to password validation
                const isPasswordError = error.details[0].message.toLowerCase().includes('password') && 
                    !error.details[0].message.toLowerCase().includes('required');
                const status = isPasswordError ? ChangePasswordStatus.WEAK_PASSWORD : ChangePasswordStatus.INVALID_DATA;
                
                return res.json(
                    buildErrorResponse(
                        status.message,
                        error.details[0].message,
                        status.code
                    )
                );
            }

            if (!req.user?.id) {
                return res.json(
                    buildErrorResponse(
                        "User not authenticated",
                        null,
                        401
                    )
                );
            }

            const result = await this.authService.changePassword(
                req.user.id,
                value.current_password,
                value.new_password
            );

            return res.json(
                buildNormalResponse(
                    result.data,
                    result.message,
                    null,
                    result.statusCode
                )
            );
        } catch (error) {
            if (error instanceof AppError) {
                return res.json(
                    buildErrorResponse(
                        error.message,
                        null,
                        error.statusCode
                    )
                );
            }
            next(error);
        }
    }
}

export default AuthController;