import apis from "apis";
import { useQuery } from "react-query";
import { API_POST } from "./config";
import { QUERY_LIST_POST_WITH_UID } from "./constants";

interface QueryPostParams {
  uid?: string;
  page: number;
  size: number;
}
export const useGetUsersPosts = (params: QueryPostParams) => {
  const { uid, page, size } = params;
  return useQuery(
    [QUERY_LIST_POST_WITH_UID, uid, page, size],
    () =>
      apis.get<ResponsePost>(API_POST, "/user/list", {
        params,
      }),
    {
      retry: 1,
      // keepPreviousData: true,
      retryOnMount: false,
      refetchOnWindowFocus: false,
    }
  );
};
