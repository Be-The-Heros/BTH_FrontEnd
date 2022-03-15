import apis from 'apis';
import { useMutation } from 'react-query';
import { API_AUTH } from '../config';

export const useCheckOtp = () => {
  return useMutation(
    async (requestPayload: { otp: number }) => {
      return await apis.post<ResponseCustom<UserInfo>>(
        API_AUTH,
        '/register/otp',
        {
          params: {
            otp: requestPayload.otp,
          },
        }
      );
    },
    {
      retry: 0,
    }
  );
};
