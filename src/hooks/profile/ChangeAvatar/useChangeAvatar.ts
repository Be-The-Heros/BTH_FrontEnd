import apis from "apis";
import { useMutation } from "react-query";
import { API_PROFILE } from "../config";
import { ChangingAvatarApiResponse } from "../model";

export const useChangeAvatar = () => {
  return useMutation((photo: File) => {
    const formData = new FormData();
    formData.append("avatar", photo);

    return apis.post<ChangingAvatarApiResponse>(
      API_PROFILE,
      "/edit-avatar-file",
      {
        body: formData,
      }
    );
  });
};
