interface commentInfo{
    id_post: string;
    id_comment: string;
    content_comment: string; 
    children?: commentInfo[];
    id_user: string;
    avatar : string;
    name: string;
    
}