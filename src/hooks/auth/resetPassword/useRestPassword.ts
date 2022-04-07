import apis from 'apis';
import { useMutation } from 'react-query';
import { API_AUTH } from '../config';
interface ResetPasswordPayload {
  newPassword: string;
  otp: string | number;
}

export const useResetPassword = () => {
  return useMutation(
    async (payload: ResetPasswordPayload) => {
      return await apis.post<UserInfo>(API_AUTH, '/reset-password', {
        body: { ...payload },
        params: { otp: payload.otp },
      });
    },
    {
      retry: 0,
    }
  );
};
