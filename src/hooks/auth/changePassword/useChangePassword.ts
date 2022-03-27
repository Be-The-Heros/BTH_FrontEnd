import apis from "apis";
import { useMutation } from "react-query";
import { API_AUTH } from "../config";
interface ChangePasswordPayload {
  password: string;
  oldPassword: string;
}

export const useResetPassword = () => {
  return useMutation(
    (body: ChangePasswordPayload) => {
      return apis.post<{ message: string }>(API_AUTH, "/change-password", {
        body,
      });
    },
    {
      retry: 0,
    }
  );
};
