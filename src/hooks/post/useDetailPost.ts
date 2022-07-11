import apis from "apis";
import { useQuery } from "react-query";
import { API_POST } from "./config";
import { QUERY_POST_DETAIL } from "./constants";

export const useQueryPostDetail = (post_id: string) => {
  return useQuery(
    [QUERY_POST_DETAIL],
    () => apis.get<PostInfo>(API_POST, `/detail/${post_id}`),
    {
      retry: 1,
      // keepPreviousData: true,
      retryOnMount: false,
      refetchOnWindowFocus: false,
    }
  );
};
