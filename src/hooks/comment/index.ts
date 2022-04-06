import apis from "apis";
import { CommentResponse } from "pages/Homepage/components/Comment";
import { useMutation, useQuery } from "react-query";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { cmtPushSubState } from "recoil/comments/state";
import { userState } from "recoil/users/state";
import { API_COMMENT } from "./config/index";
import { QUERY_COMMENT } from "./constants";

export const useLoadComment = (postId: number) => {
  return useQuery([QUERY_COMMENT], () =>
    apis.get<CommentResponse[]>(
      API_COMMENT,
      `/get-list-comments-of-post?idPost=${postId}`
    )
  );
};

const createCommentApi = (body: createCmtProps) => {
  return apis.post<CommentResponse>(API_COMMENT, "/create-comment-in-post", {
    body,
  });
};

export const useCreateComment = () => {
  const onPushCmt = useSetRecoilState(cmtPushSubState);
  const infoUser = useRecoilValue(userState);

  return useMutation(createCommentApi, {
    onSuccess: (data) => {
      onPushCmt({
        type: "add",
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

export const useDeleteComment = () => {
  const onPushCmt = useSetRecoilState(cmtPushSubState);
  const infoUser = useRecoilValue(userState);

  const deleteCommentApi = (body: deleteComment) => {
    return apis.delete<CommentResponse>(
      API_COMMENT,
      "/remove-comment-in-post",
      {
        body,
      }
    );
  };

  return useMutation(deleteCommentApi, {
    onSuccess: (data) => {

      console.log('data',data)
      onPushCmt({
        type: "remove",
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
