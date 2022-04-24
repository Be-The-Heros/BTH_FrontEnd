import apis from "apis";
import { useMutation } from "react-query";
import { API_KYC } from "../config";

interface KycBody {
  document_id: string;
  user_photo: string;
  residential_address: string;
  document_photo: string;
  passport: string;
  date_of_birth: string;
  fullname: string;
  province: string;
}

export const useChangeAvatar = () => {
  return useMutation((body: KycBody) => {
    return apis.post(API_KYC, "/submit", {
      body,
    });
  });
};
