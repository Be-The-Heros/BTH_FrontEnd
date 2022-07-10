interface RequestRegisterAuthGoogle {
  uid_gg: string;
  username: string;
  photo_url: string | null;
  email: string | null;
  type: "google" | "facebook" | "manual";
  password: string;
  emailVerified: boolean;
  first_name: string;
  last_name: string;
  date_of_birth: Date;
  accessToken: string;
}
