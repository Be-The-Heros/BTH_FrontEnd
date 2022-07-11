import apis from "apis";
import { useMutation } from "react-query";
import { API_AUTH } from "./config";

export const useSignUp = () => {
  return useMutation(
    async (body: Partial<RequestRegisterAuthGoogle>) => {
      return await apis.post<UserInfo>(API_AUTH, "/register", {
        body: {
          ...body,
        },
        params: {
          type: body.type,
        },
      });
    },
    {
      retry: 0,
    }
  );
};
