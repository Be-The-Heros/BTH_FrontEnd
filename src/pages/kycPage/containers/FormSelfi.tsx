import { Button, Select } from "antd";
import React from "react";
import { FcCancel, FcOk } from "react-icons/fc";
import Webcam from "react-webcam";
import { useRecoilState } from "recoil";
import { kycState } from "recoil/kycState/state";
import Style from "./style";
const { Option } = Select;

export const FormSelfie = () => {
  const webcamRef = React.useRef<any>(null);

  // TODO: INIT STATE
  const [deviceId, setDeviceId] = React.useState<
    ConstrainDOMString | undefined
  >();
  const [devices, setDevices] = React.useState<MediaDeviceInfo[]>([]);
  const [isTakePhoto, setTakePhoto] = React.useState(false);

  const [kyc, setKycState] = useRecoilState(kycState);

  const notes = [
    {
      icon: <FcOk />,
      description: "Take a selfie of yourself with a neutral expression",
    },
    {
      icon: <FcOk />,
      description:
        "Make sure your face is visible, cented and your eyes are open",
    },
    {
      icon: <FcCancel />,
      description: "Do not crop your ID use scree of your ID ",
    },
    {
      icon: <FcCancel />,
      description:
        "Do not hide or after parts of your face (No hats/ beauty image/ filter)",
    },
  ];
  // TODO: GET ALL DEVICES CAMERA
  const handleDevices = React.useCallback(
    (mediaDevices: MediaDeviceInfo[]) =>
      setDevices(mediaDevices.filter(({ kind }) => kind === "videoinput")),
    [setDevices]
  );

  React.useEffect(() => {
    navigator.mediaDevices.enumerateDevices().then(handleDevices);
  }, [handleDevices]);
  const captureImage = React.useCallback(() => {
    if (webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot();
      imageSrc && setKycState({ ...kyc, user_photo: imageSrc });
      setTakePhoto(true);
    }
  }, [webcamRef]);

  return (
    <Style>
      <div className="form-selfie">
        <h6>Take Selfie Photo</h6>
        <div className="d-flex">
          <div className="col-md-4">
            <img
              style={{
                height: "10rem",
                borderRadius: "10px",
                objectFit: "contain",
                width: "auto",
              }}
              src={
                "https://cdn.eva.vn//upload/4-2013/images/2013-12-17/1387249093-1.1.jpg"
              }
              alt="img-example"
            />
          </div>
          <div className="col-md-8">
            {notes.map((note, index) => (
              <div key={index} className="form-upload-header-note">
                {note.icon} {note.description}
              </div>
            ))}
          </div>
        </div>

        <div className="form-upload-webcam d-flex justify-content-between mt-3">
          <div className="w-70">
            {isTakePhoto ? (
              <img
                style={{
                  height: 250,
                  objectFit: "contain",
                  width: "auto",
                }}
                src={kyc.user_photo}
                alt="image-take"
              />
            ) : (
              <Webcam
                audio={false}
                height={250}
                ref={webcamRef}
                screenshotFormat="image/jpeg"
                videoConstraints={{ deviceId: deviceId }}
              />
            )}
          </div>

          <div className="w-30 d-flex justify-content-center align-items-center">
            <Button
              onClick={() =>
                isTakePhoto ? setTakePhoto(false) : captureImage()
              }
            >
              {isTakePhoto ? "Retake" : "Take"} Photo
            </Button>
          </div>
        </div>

        <Select
          className="w-50 mt-2"
          defaultValue={""}
          onChange={(value) => setDeviceId(value)}
        >
          <Option value=""> Select other camera</Option>
          {devices.map((device, key) => (
            <Option value={device.deviceId} key={key}>
              {device.label || `Device ${key + 1}`}
            </Option>
          ))}
        </Select>
      </div>
    </Style>
  );
};
