import apis from 'apis';
import { useMutation, useQuery } from 'react-query';
import { API_POST } from '../config';
import { GENERATE_OTP } from './contants';

export const useGenerateOtp = () => {
  return useMutation((email: string) =>
    apis.post<ResponseCustom<any>>(API_POST, '/generate', {
      body: { email },
    })
  );
};
