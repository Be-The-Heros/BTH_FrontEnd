import apis from 'apis';
import { useMutation } from 'react-query';
import { API_USER } from '../config';

export const useVerifyEmail = () => {
  return useMutation((otp: number | string) =>
    apis.post<UserInfo>(API_USER, '/verify-email', {
      params: {
        otp,
      },
    })
  );
};
