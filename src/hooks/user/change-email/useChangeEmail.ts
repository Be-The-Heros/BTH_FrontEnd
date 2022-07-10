import apis from "apis";
import { useMutation } from "react-query";
import { API_USER } from "../config";

export const useChangeEmail = () => {
  return useMutation((email: string) =>
    apis.post<{ email: string }>(API_USER, "/change-email", {
      body: {
        email,
      },
    })
  );
};
