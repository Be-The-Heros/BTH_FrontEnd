import { API_COMMENT } from "./config/index";
import apis from "apis";
import axios from "axios";
import { CommentResponse } from "pages/Homepage/components/Comment";
import { useMutation, useQuery } from "react-query";
import { useRecoilState } from "recoil";
import { cmtPushSubState } from "recoil/comments/state";
import { userState } from "recoil/users/state";

export const useLoadingComment = (postId: number) => {
  return useQuery(["loadingComment"], () =>
    apis.get<CommentResponse[]>(
      API_COMMENT,
      `/get-list-comments-of-post?idPost=${postId}`
    )
  );
};

interface createCmtProps {
  postId: number;
  rep?: number;
  content: string;
  token: string;
}

const createCommentApi = async (data: createCmtProps) => {
  const response = await apis.post<CommentResponse>(
    API_COMMENT,
    "/create-comment-in-post",
    {
      body: {
        post_id: data.postId,
        content: data.content,
        rep: data.rep || "",
      },
    }
  );

  return response;
};

export const useCreateComment = () => {
  const [_, onPush] = useRecoilState(cmtPushSubState);
  const [infoUser] = useRecoilState(userState);

  return useMutation(createCommentApi, {
    onSuccess: (data) => {
      onPush({
        content: data.content || "",
        postId: data.post_id,
        rep: data?.rep,
        uid: data.uid,
        comment_id: data.comment_id,
        profile: {
          avatar: infoUser.avatar || "",
          uid: infoUser.uid,
          first_name: infoUser.first_name,
          last_name: infoUser.last_name,
        },
      });
    },
    onError: (error) => {
      console.log(error);
    },
  });
};
