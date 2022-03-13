export interface UserInfo {
  id: string;
  name: string;
  email: string;
  avatar: string;
  bio: string;
  isLoggedIn: boolean;
}
export interface Post {
  id_post: string;
  uid : string;
  create_at: string;
  photos : Array<string>;
  residential_address: string;
  district : string;
  ward: string;
  province: string;

}
