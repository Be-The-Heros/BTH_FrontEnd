import { atom } from "recoil";
import { CHECK_IF_IS_MOBILE_DEVICE } from "./constants";

export const appState = atom<AppState>({
  key: CHECK_IF_IS_MOBILE_DEVICE,
  default: {
    isMobileDevice: false,
  },
});
