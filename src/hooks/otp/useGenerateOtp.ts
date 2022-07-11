import apis from "apis";
import { useMutation } from "react-query";
import { API_OTP } from "./config";

export const useGenerateOtp = () => {
  return useMutation((email: string) =>
    apis.post(API_OTP, "/generate", {
      body: { email },
    })
  );
};
