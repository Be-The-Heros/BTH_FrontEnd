interface ProfileInfo {
  uid: string;
  user_id: number;
  first_name: string;
  last_name: string;
  middle_name: string;
  date_of_birth: string;
  phone: string;
  status: ProfileInfoStatus;
  avatar: string;
  cover_image: string;
  bio: string;
  city: string;
  address: string;
  level?: number;
}
export enum ProfileInfoStatus {
  public = "public",
  private = "private",
}

interface ChangingAvatarApiResponse {
  avatar: string;
}

interface ChangingBackgroundPhotoApiResponse {
  cover_image: string;
}
