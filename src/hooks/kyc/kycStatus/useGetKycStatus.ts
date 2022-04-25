import apis from "apis";
import { useMutation } from "react-query";
import { API_KYC } from "../config";

interface KycStatusResponse {
  status: "pending" | "failed" | "unsent" | "verified";
  reason?: string;
}
export const useGetKycStatus = () => {
  return useMutation(() => {
    return apis.get<KycStatusResponse>(API_KYC, "/status");
  });
};
