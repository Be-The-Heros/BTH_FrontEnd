import apis from "apis";
import { useMutation } from "react-query";
import { API_PROFILE } from "../config";
import { ProfileInfo } from "../model";

interface EditUserInformBody {
  first_name: string;
  last_name: string;
  middle_name: string;
  date_of_birth: string;
  phone: string;
}

export const useEditUsersInform = () => {
  return useMutation((body: EditUserInformBody) => {
    return apis.post<ProfileInfo>(API_PROFILE, "/edit", {
      body,
    });
  });
};
