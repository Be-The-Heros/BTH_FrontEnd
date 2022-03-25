interface PostInfo {
  post_id: number;
  uid: string;
  avatar: string;
  name: string;
  org_id?: number;
  residential_address: string;
  status: string;
  ward: string;
  district: string;
  long: number;
  lat: number;
  is_edited: number;
  user_id?: number;
  type?: 'share' | 'post';
  end_date?: Date;
  start_date?: Date;
  updated_at: Date;
  from_post?: number;
  province: string;
  content_share?: string;
  photos?: string[];
  title: string;
  joined: number;
  content: string;
}
interface RequestPost {
  residential_address: string;
  ward: string;
  district: string;
  content: string;
  join_url: string;
  title: string;
  photos?: File[];
  province: string;
}
