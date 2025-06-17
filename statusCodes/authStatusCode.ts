// Registration status codes and messages
export const RegisterStatus = {
    SUCCESS: {
        code: 0,
        message: "Register successfully"
    },
    EMAIL_EXISTS: {
        code: 100,
        message: "Email already exists"
    },
    PHONE_EXISTS: {
        code: 101,
        message: "Phone number already exists"
    },
    INVALID_DATA: {
        code: 102,
        message: "Invalid registration data"
    },
    WEAK_PASSWORD: {
        code: 103,
        message: "Password is weak"
    }
} as const;

// Login status codes and messages
export const LoginStatus = {
    SUCCESS: {
        code: 0,
        message: "Login successfully"
    },
    INVALID_CREDENTIALS: {
        code: 100,
        message: "Invalid email or password"
    },
    MISSING_CREDENTIALS: {
        code: 101,
        message: "Missing email or password"
    }
} as const;

// Forgot password status codes and messages
export const ForgotPasswordStatus = {
    SUCCESS: {
        code: 0,
        message: "Password reset email sent successfully"
    },
    EMAIL_NOT_FOUND: {
        code: 100,
        message: "Email not found"
    },
    INVALID_DATA: {
        code: 101,
        message: "Invalid forgot password data"
    }
} as const;

// Verify OTP status codes and messages
export const VerifyOTPStatus = {
    SUCCESS: {
        code: 0,
        message: "OTP verified successfully"
    },
    INVALID_OTP: {
        code: 100,
        message: "Invalid OTP"
    },
    EXPIRED_OTP: {
        code: 101,
        message: "OTP has expired"
    },
    OTP_ALREADY_USED: {
        code: 102,
        message: "OTP has already been used"
    },
    INVALID_DATA: {
        code: 103,
        message: "Invalid OTP data"
    }
} as const;

// Reset password status codes and messages
export const ResetPasswordStatus = {
    SUCCESS: {
        code: 0,
        message: "Password reset successfully"
    },
    INVALID_OTP: {
        code: 100,
        message: "Invalid OTP"
    },
    EXPIRED_OTP: {
        code: 101,
        message: "OTP has expired"
    },
    OTP_ALREADY_USED: {
        code: 102,
        message: "OTP has already been used"
    },
    INVALID_DATA: {
        code: 103,
        message: "Invalid reset password data"
    },
    WEAK_PASSWORD: {
        code: 104,
        message: "Password is weak"
    }
} as const;

// Change password status codes and messages
export const ChangePasswordStatus = {
    SUCCESS: {
        code: 0,
        message: "Password changed successfully"
    },
    INVALID_CURRENT_PASSWORD: {
        code: 100,
        message: "Current password is incorrect"
    },
    INVALID_DATA: {
        code: 101,
        message: "Invalid change password data"
    },
    WEAK_PASSWORD: {
        code: 102,
        message: "Password is weak"
    }
} as const;

// Types for status codes
export type RegisterStatusCode = typeof RegisterStatus[keyof typeof RegisterStatus]['code'];
export type LoginStatusCode = typeof LoginStatus[keyof typeof LoginStatus]['code'];
export type ForgotPasswordStatusCode = typeof ForgotPasswordStatus[keyof typeof ForgotPasswordStatus]['code'];
export type VerifyOTPStatusCode = typeof VerifyOTPStatus[keyof typeof VerifyOTPStatus]['code'];
export type ResetPasswordStatusCode = typeof ResetPasswordStatus[keyof typeof ResetPasswordStatus]['code'];
export type ChangePasswordStatusCode = typeof ChangePasswordStatus[keyof typeof ChangePasswordStatus]['code']; 