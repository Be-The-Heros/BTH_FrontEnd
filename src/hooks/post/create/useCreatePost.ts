import apis from 'apis';
import { useMutation } from 'react-query';
import { API_POST } from '../config';

export const useCreatePost = () => {
  return useMutation((body: Partial<RequestPost>) => {
    return apis.post<ResponseCustom<{ email: string }>>(API_POST, '/post', {
      body,
    });
  });
};
