interface createCmtProps {
  post_id: number;
  rep?: number;
  content: string;
}

interface eidtCmtProps {
  post_id: number;
  comment_id: number;
  content: string;
}

interface deleteComment {
  comment_id: number;
  post_id: number;
}
