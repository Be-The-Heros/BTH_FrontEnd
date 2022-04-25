import * as React from "react";
import { useRecoilState } from "recoil";
import { appState } from "recoil/appState/state";

export const useSetMobileDevice = () => {
  const [appStateValue, setAppState] = useRecoilState(appState);

  React.useEffect(() => {
    const handleResize = () => {
      const isCurrentlyInMobileDevice = window.innerWidth <= 768;
      if (appStateValue.isMobileDevice !== isCurrentlyInMobileDevice) {
        setAppState({
          ...appStateValue,
          isMobileDevice: isCurrentlyInMobileDevice,
        });
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, [appStateValue.isMobileDevice]);

  return appStateValue.isMobileDevice;
};
