import apis from "apis";
import { useMutation } from "react-query";
import { API_KYC } from "../config";

interface KycBody {
  document_id: String;
  user_photo: String;
  residential_address: String;
  document_photo: String;
  passport: "identity_card" | "license_card";
  date_of_birth: String;
  fullname: String;
  province: String;
  token?: string;
}

export const useSubmitKyc = () => {
  return useMutation(async (body: KycBody) => {
    return apis.post(API_KYC, "/submit", {
      body,
      params: { token: body.token },
    });
  });
};
