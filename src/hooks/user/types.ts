export interface FormLoginAttributes {
  email?: string;
  username?: string;
  password: string;
}
export interface FormRegisterByEmail extends FormLoginAttributes {
  firstName: string;
  lastName: string;
}
export interface RequestForgotPassword {
  email: string;
  newPassword: string;
  otp: number;
}
export interface UseRegisterUserByGoogle {
  thirdPartyTokens: string;
  email: string;
  firstName: string;
  lastName: string;
  avatar: string;
}
export interface UseRegisterUserByEmail {
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}
