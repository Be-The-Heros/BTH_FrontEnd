import apis from "apis";
import { useMutation } from "react-query";
import { API_POST } from "../config";

export const useDeletePost = () => {
  return useMutation((body: { post_id: string }) => {
    return apis.delete(API_POST, "/delete", {
      body,
    });
  });
};
