import apis from 'apis';
import { useMutation } from 'react-query';
import { API_INVITE } from '../config';
export const useJoinGroupChat = () => {
  return useMutation((chat_id: string) =>
    apis.post(API_INVITE, '/join', {
      body: { chat_id },
    })
  );
};
