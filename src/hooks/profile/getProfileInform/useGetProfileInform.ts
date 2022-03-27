import apis from "apis";
import { useMutation } from "react-query";
import { API_PROFILE } from "../config";
import { ProfileInfo } from "../model";

export const useGetProfileInform = () => {
  return useMutation(() => apis.get<ProfileInfo>(API_PROFILE, "/", {}));
};
