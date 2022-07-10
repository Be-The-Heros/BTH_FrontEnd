import apis from "apis";
import { useMutation } from "react-query";
import { API_POST } from "../config";

export const useEditPost = () => {
  return useMutation((body: Partial<PostInfo>) => {
    return apis.put(API_POST, "/edit", {
      body: {
        ...body,
        photos: body.photos?.join(","),
      },
    });
  });
};
