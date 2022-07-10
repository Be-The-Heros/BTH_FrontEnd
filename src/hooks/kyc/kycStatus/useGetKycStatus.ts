import apis from "apis";
import { useMutation } from "react-query";
import { API_KYC } from "../config";

export interface KycStatusResponse {
  status: "pending" | "failed" | "unsent" | "verified";
  reason?: string;
}
export const useGetKycStatus = () => {
  return useMutation((token: string | undefined) => {
    return apis.get<KycStatusResponse>(API_KYC, "/status", {
      params: {
        token,
      },
    });
  });
};
