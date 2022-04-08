import apis from "apis";
import { useMutation } from "react-query";
import { API_PROFILE } from "../config";
import { ChangingBackgroundPhotoApiResponse } from "../model";

export const useChangeBackgroundPhoto = () => {
  return useMutation((photo: File) => {
    const formData = new FormData();
    formData.append("cover_image", photo);

    return apis.put<ChangingBackgroundPhotoApiResponse>(
      API_PROFILE,
      "/edit-background-cover-file",
      {
        body: formData,
      }
    );
  });
};
