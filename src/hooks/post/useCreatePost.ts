import apis from "apis";
import toString from "lodash/toString";
import { useMutation } from "react-query";
import { API_POST } from "./config";

export const useCreatePost = () => {
  return useMutation(async (body: RequestPost) => {
    const formData = new FormData();
    const { photos } = body;
    photos?.forEach((photo) => {
      formData.append("files", photo);
    });
    Object.keys(body).forEach((key: string) => {
      const value = body[key as keyof RequestPost];
      if (value && typeof value !== "object") {
        formData.append(key, toString(value));
      }
    });

    return apis.post<PostInfo>(API_POST, "/create", {
      body: formData,
    });
  });
};
