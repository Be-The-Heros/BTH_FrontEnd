import apis from "apis";
import { useQuery } from "react-query";
import { API_POST } from "../config";
import { QUERY_LIST_POST } from "./constants";

interface QueryPostParams {
  page: number;
  size: number;
}
export const useQueryListPost = (params: QueryPostParams) => {
  const { page, size } = params;
  return useQuery(
    [QUERY_LIST_POST, page, size],
    () => apis.get<ResponsePost>(API_POST, "/list", { params }),
    {
      retry: 1,
      // keepPreviousData: true,
      retryOnMount: true,
      refetchOnWindowFocus: false,
    }
  );
};
