import { atom } from "recoil";
import { KYC_STATE } from "./constants";

export const kycState = atom<KycState>({
  key: KYC_STATE,
  default: {
    document_id: "",
    user_photo: "",
    residential_address: "",
    document_photo: "",
    passport: "identity_card",
    date_of_birth: "",
    fullname: "",
    province: "",
  },
});
