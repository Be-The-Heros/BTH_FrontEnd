import apis from "apis";
import { useQuery } from "react-query";
import { API_INVITE } from "../config";
import { StatusChat } from "../types";

const GET_STATUS_CHAT = "GET_STATUS_CHAT";
export const useGetStatusChat = (chat_id: string) => {
  return useQuery(
    [GET_STATUS_CHAT],
    () =>
      apis.get<StatusChat>(API_INVITE, "/status", {
        params: { chat_id },
      }),
    {
      retry: 1,
      // keepPreviousData: true,
      retryOnMount: false,
      refetchOnWindowFocus: false,
    }
  );
};
