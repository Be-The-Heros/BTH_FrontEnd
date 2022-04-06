import { atom } from "recoil";

interface ISub {
  type: string;
  content: string;
  postId: number;
  rep?: number;
  comment_id: number;
  uid: string;
  profile: {
    uid: string;
    first_name?: string;
    last_name?: string;
    status?: string;
    avatar: string;
    address?: string;
    bio?: string;
  };
}

export const cmtPushSubState = atom<ISub>({
  key: "CMT_PUSH_SUB",
  default: {
    type: "add" || "remove",
    postId: 0,
    content: "",
    comment_id: 0,
    uid: "",
    profile: {
      uid: "",
      first_name: "",
      last_name: "",
      avatar: "",
      address: "",
      bio: "",
    },
  },
});
