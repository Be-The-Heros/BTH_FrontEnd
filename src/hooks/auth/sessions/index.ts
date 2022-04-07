import apis from 'apis';
import { useQuery } from 'react-query';
import { API_AUTH } from '../config';
import { QUERY_SESSIONS } from './constants';
export const useQuerySessions = () => {
  return useQuery(
    QUERY_SESSIONS,
    () => apis.get<UserInfo>(API_AUTH, '/sessions'),
    {
      retry: 0,
      keepPreviousData: true,
      refetchInterval: false,
      retryOnMount: false,
      refetchOnWindowFocus: false,
    }
  );
};
