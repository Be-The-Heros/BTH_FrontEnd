import React from "react";
import Style from "./style";
import { FcCancel, FcOk } from "react-icons/fc";
import Webcam from "react-webcam";
import { Button, Select } from "antd";
import { kycState } from "recoil/kycState/state";
import { useRecoilState } from "recoil";

const { Option } = Select;
const videoConstraints = {
  width: 500,
  height: 300,
  facingMode: "user",
};
export const FormUploadCard = () => {
  const webcamRef = React.useRef<any>(null);

  // TODO: INIT STATE
  const [deviceId, setDeviceId] = React.useState<
    ConstrainDOMString | undefined
  >();
  const [devices, setDevices] = React.useState<MediaDeviceInfo[]>([]);
  const [isTakePhoto, setTakePhoto] = React.useState(false);

  // TODO: RECOIL STATE
  const [kyc, setKycState] = useRecoilState(kycState);

  // TODO: GET ALL DEVICES CAMERA
  const handleDevices = React.useCallback(
    (mediaDevices: MediaDeviceInfo[]) =>
      setDevices(mediaDevices.filter(({ kind }) => kind === "videoinput")),
    [setDevices]
  );

  React.useEffect(() => {
    navigator.mediaDevices.enumerateDevices().then(handleDevices);
  }, [handleDevices]);
  const notes = [
    {
      icon: <FcOk />,
      description: " Government - issued",
    },
    {
      icon: <FcOk />,
      description: "Original full - size, unedited documents",
    },
    {
      icon: <FcOk />,
      description: "Place document against a single - coloured background",
    },
    {
      icon: <FcOk />,
      description: "Readable, well - lit, coloured images",
    },
    {
      icon: <FcCancel />,
      description: "No black and white images",
    },
    {
      icon: <FcCancel />,
      description: "No edited or expired documents",
    },
  ];

  const captureImage = React.useCallback(() => {
    if (webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot();
      imageSrc && setKycState({ ...kyc, document_photo: imageSrc });
      setTakePhoto(true);
    }
  }, [webcamRef]);

  React.useEffect(() => {
    if (!isTakePhoto) {
      setKycState({ ...kyc, document_photo: "" });
    }
  }, [isTakePhoto]);
  return (
    <Style>
      <div className="form-upload">
        <div className="form-upload-header d-flex justify-content-between">
          <div className="col-5">
            <img src="https://cms.luatvietnam.vn/uploaded/Images/Original/2019/01/18/anh_cmnd_1801141244.jpg"></img>
          </div>
          <div className="col-7">
            {notes.map((note, index) => (
              <div key={index} className="form-upload-header-note">
                {note.icon} {note.description}
              </div>
            ))}
          </div>
        </div>

        <div className="form-upload-webcam d-flex justify-content-between mt-2">
          <div className="w-70">
            {isTakePhoto ? (
              <img
                style={{
                  height: 250,
                  objectFit: "contain",
                  width: "auto",
                }}
                src={kyc.document_photo}
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
