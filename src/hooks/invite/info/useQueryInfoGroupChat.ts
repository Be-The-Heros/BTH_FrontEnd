import apis from 'apis';
import { useQuery } from 'react-query';
import { API_INVITE } from '../config';
import { InfoChatGroup } from '../types';

const QUERY_INFO_CHAT = 'joinChatGroup';
export const useQueryInfoGroupChat = (chat_id: string, enabled = true) => {
  return useQuery(
    [QUERY_INFO_CHAT],
    () =>
      apis.get<InfoChatGroup>(API_INVITE, '/info', {
        params: { chat_id },
      }),
    {
      retry: 1,
      enabled,
      retryOnMount: false,
      refetchOnWindowFocus: false,
    }
  );
};
