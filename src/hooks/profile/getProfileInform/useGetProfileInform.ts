import apis from "apis";
import { useMutation } from "react-query";
import { API_PROFILE } from "../config";
import { ProfileInfo } from "../model";

interface GetProfileByUIDBody {
  uid: string;
}
export const useGetProfileInformByUID = () => {
  return useMutation((body: GetProfileByUIDBody) =>
    apis.post<ProfileInfo>(API_PROFILE, "/get-profile-by-id", { body })
  );
};
