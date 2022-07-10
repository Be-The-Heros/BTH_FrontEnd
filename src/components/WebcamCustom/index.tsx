import React from "react";
import Webcam from "react-webcam";

export const WebcamCustom = React.forwardRef(
  (props: Webcam, ref: React.LegacyRef<Webcam> | undefined) => {
    return <Webcam audio={false} height={250} {...props} ref={ref} />;
  }
);
