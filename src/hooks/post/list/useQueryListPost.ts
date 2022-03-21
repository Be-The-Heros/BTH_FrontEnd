import apis from 'apis';
import { useQuery } from 'react-query';
import { API_POST } from '../config';
import { QUERY_LIST_POST } from './constants';

export const useQueryListPost = () => {
  return useQuery(
    QUERY_LIST_POST,
    () => apis.get<ResponseCustom<PostInfo>>(API_POST, '/list'),
    {
      retry: 0,
      keepPreviousData: true,
      refetchInterval: false,
      retryOnMount: false,
      refetchOnWindowFocus: false,
    }
  );
};
