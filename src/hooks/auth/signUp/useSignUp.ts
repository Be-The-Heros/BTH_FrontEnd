import apis from 'apis';
import { useMutation } from 'react-query';
import { API_AUTH } from '../config';

export const useSignUp = () => {
  return useMutation(
    async (requestPayload: Partial<RequestRegisterAuthGoogle>) => {
      return await apis.post<ResponseCustom<UserInfo>>(API_AUTH, '/register', {
        body: {
          ...requestPayload,
        },
        params: {
          type: requestPayload.type,
        },
      });
    },
    {
      retry: 0,
    }
  );
};
