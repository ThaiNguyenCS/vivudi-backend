/******************************************************************************\
 *                   © ViVuDi 2025. All rights reserved.                      *
 *******************************************************************************
 *  File        : auth.service.ts                                             *
 *  Author      : Minh Nhật                                                   *
 *  Created     : 13/06/2025                                                  *
 *  Updated by  :                                                             *
 *  Modified    :                                                             *
\******************************************************************************/

import { any } from "joi";
import { LoginDto, RegisterDto, ResetPasswordDto, ForgotPasswordDto, ChangePasswordDto, VerifyOtpDto } from "../dto/auth.dto";
import { baseApiService } from "./base.service";

/******************************************************************************
 * AuthService Class                                                          *
 ******************************************************************************/
class AuthServiceClass {
  /******************************************************************************
   * Tạo instance cho service                                                   *
   ******************************************************************************/
  private static instance: AuthServiceClass;

  /******************************************************************************
   * Hàm khởi tạo private để đảm bảo chỉ có một instance duy nhất               *
   ******************************************************************************/
  private constructor() { }

  /******************************************************************************
   * Hàm lấy instance của AuthService                                           *
   * Sử dụng singleton pattern để đảm bảo chỉ có một instance duy nhất          *
   ******************************************************************************/
  static getInstance(): AuthServiceClass {
    if (!AuthServiceClass.instance) {
      AuthServiceClass.instance = new AuthServiceClass();
    };

    return AuthServiceClass.instance;
  };

  /******************************************************************************
   * Hàm đăng nhập người dùng                                                   *
   * @param payload: LoginDTO - Dữ liệu đăng nhập của người dùng                *
   * @returns Promise<any> - Kết quả trả về từ API                              *
   ******************************************************************************/
  public async login(payload: LoginDto) {
    return await baseApiService.post<any>("/auth/login", { body: payload });
  };

  public async register(payload: RegisterDto) {
    return await baseApiService.post<any>("/auth/register", { body: payload });
  };

  public async forgotPassword(payload: ForgotPasswordDto) {
    return await baseApiService.post<any>("/auth/forgot_password", { body: payload });
  };

  public async resetPassword(payload: ResetPasswordDto) {
    return await baseApiService.post<any>("/auth/reset_password", { body: payload });
  };

  public async changePassword(payload: ChangePasswordDto, bearerToken: string) {
    return await baseApiService.post<any>("/auth/change_password", { body: payload, headers: { "Authorization": `Bearer ${bearerToken}` } });
  };

  public async verifyOtp(payload: VerifyOtpDto) {
    return await baseApiService.post<any>("/auth/verify_otp", { body: payload });
  };

};

/******************************************************************************\
 * Khởi tạo instance của AuthService                                           *
 ******************************************************************************/
export const authService = AuthServiceClass.getInstance();