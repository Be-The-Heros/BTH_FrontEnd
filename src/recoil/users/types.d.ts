interface UserInfo {
  token: string;
  uid: string;
  name: string;
  email: string;
  avatar?: string;
  isLoggedIn: boolean;
  level: number;
  status?: boolean;
  is_reported: boolean;
  is_locked: boolean;
  is_otp: boolean;
  date_of_birth: string;
  first_name: string;
  last_name: string;
}
