import { atom } from "recoil";
import { ORGANIZATION_LIST } from "./constants";
export const organizationState = atom<Organization[]>({
  key: ORGANIZATION_LIST, // unique ID (with respect to other atoms/selectors)
  default: [
    {
      org_id: "01",
      address: "Da Nang",
      name: "UNICEFE",
    },
    {
      org_id: "02",
      avatar: "",
      address: "Hoi An",
      name: "ART",
    },
    {
      org_id: "03",
      avatar: "",
      address: "Vinh",
      name: "Sacc",
    },
    {
      org_id: "04",
      avatar: "",
      address: "Da Nang",
      name: "BTH",
    },
  ],
});
