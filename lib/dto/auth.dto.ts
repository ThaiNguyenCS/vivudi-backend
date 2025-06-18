export class RegisterDto {
  /****************************
   * Email người dùng
   * Phải đúng định dạng email
   ****************************/
  public email!: string;

  /****************************
   * Số điện thoại
   * Yêu cầu: 10 chữ số
   * Pattern: /^[0-9]{10}$/
   ****************************/
  public phone_number!: string;

  /****************************
   * Mật khẩu
   * Yêu cầu: tối thiểu 8 ký tự, có chữ hoa, chữ thường, số, ký tự đặc biệt
   * Pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/
   ****************************/
  public password!: string;

  constructor() {
    this.email = '';
    this.phone_number = '';
    this.password = '';
  }
}


export class LoginDto {
  /****************************
   * Email đăng nhập
   ****************************/
  public email!: string;

  /****************************
   * Mật khẩu đăng nhập
   ****************************/
  public password!: string;

  constructor() {
    this.email = '';
    this.password = '';
  }
}

export class ForgotPasswordDto {
  /****************************
   * Email để đặt lại mật khẩu
   ****************************/
  public email!: string;

  constructor() {
    this.email = '';
  }
}


export class ResetPasswordDto {
  /****************************
   * Mã OTP xác thực
   * Yêu cầu: đúng 6 chữ số
   * pattern: /^\d{6}$/
   ****************************/
  public otp!: string;

  /****************************
   * Mật khẩu mới
   * Yêu cầu: ít nhất 8 ký tự, có chữ hoa, chữ thường, số và ký tự đặc biệt
   * pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
   ****************************/
  public password!: string;

  constructor() {
    this.otp = '';
    this.password = '';
  }
}

export class ChangePasswordDto {
  /****************************
   * Mật khẩu hiện tại
   ****************************/
  public current_password!: string;

  /****************************
   * Mật khẩu mới
   * Yêu cầu: ít nhất 8 ký tự, có chữ hoa, chữ thường, số và ký tự đặc biệt
   * pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
   ****************************/
  public new_password!: string;

  constructor() {
    this.current_password = '';
    this.new_password = '';
  }
}


export class VerifyOtpDto {
  /****************************
   * Mã OTP xác thực
   * Yêu cầu: đúng 6 chữ số
   * pattern: /^\d{6}$/
   ****************************/
  public otp!: string;

  constructor() {
    this.otp = '';
  }
}

