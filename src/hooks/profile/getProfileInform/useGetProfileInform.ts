import apis from "apis";
import { useMutation } from "react-query";
import { API_PROFILE } from "../config";
import { ProfileInfo } from "../model";

interface GetProfileByUIDParam {
  uid: string;
}
export const useGetProfileInformByUID = () => {
  return useMutation((params: GetProfileByUIDParam) => {
    const { uid } = params;
    return apis.get<ProfileInfo>(API_PROFILE, `/get-profile-by-id?uid=${uid}`);
  });
};
