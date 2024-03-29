interface PostInfo {
  post_id: string;
  uid: string;
  avatar: string;
  fullname: string;
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
  join_url?: string;
  bio?: string;
  user_address?: string;
  level: number;
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
  isCreateChat: boolean;
}

interface ResponsePost {
  list: PostInfo[];
  total: number;
}
