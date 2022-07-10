import apis from "apis";
import { useMutation } from "react-query";
import { API_AUTH } from "../config";

export const useSignIn = () => {
  return useMutation((requestPayload: Partial<RequestRegisterAuthGoogle>) =>
    apis.post<UserInfo>(API_AUTH, "/login", {
      body: {
        ...requestPayload,
      },
      params: {
        type: requestPayload.type,
      },
    })
  );
};
