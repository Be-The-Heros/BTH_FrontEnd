import {
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from '@mui/material';
import { Button, Input } from 'antd';
import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import VietNamIcon from 'assets/icons/vietnam-icon.png';
import InboxIcon from '@mui/icons-material/Inbox';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import { ContinueButton } from '../../components';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import IDCardImageSrc from 'assets/images/id-card.png';
import Webcam from 'react-webcam';
import DocumentUploadedImage from 'assets/images/document_uploaded.jpg';
import SelfieExampleImage from 'assets/images/selfie-example.jpg';
import DoneIcon from '@mui/icons-material/Done';
import CloseIcon from '@mui/icons-material/Close';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import { useRecoilState } from 'recoil';
import { kycState } from 'recoil/kycState/state';
import { useSubmitKyc } from 'hooks/kyc/submitKyc/useSubmitKyc';
import { useGenerateURLImage } from 'hooks/image/useCreateImageURL';
import { base64ToFile } from 'helpers/base64ToFile';
import FlipCameraIosIcon from '@mui/icons-material/FlipCameraIos';

const TYPE_FILE = 'image/png';
const Container = styled.div<IdentityVerificationProps>`
  display: ${(props) => !props.active && 'none'};
  width: 100%;
  height: 100%;

  .ant-input-prefix {
    margin-right: -21px;
  }

  .ant-input-affix-wrapper-disabled,
  .ant-input-affix-wrapper[disabled] {
    color: #000;
    background-color: #ededed;
  }
`;

const Title = styled(Typography)`
  && {
    font-weight: 700;
    line-height: 42px;
    letter-spacing: 0em;
    padding-bottom: 0.6em;
  }
`;

const SubTitle = styled(Typography)`
  && {
    font-weight: 900;
    line-height: 30px;
    letter-spacing: 0em;
    padding-bottom: 0.6em;
  }
`;

const Label = styled(Typography)`
  && {
    font-weight: 400;
    line-height: 25px;
    letter-spacing: 0em;
    padding-bottom: 0.2em;
  }
`;

const AddButton = styled(Button)`
  background-color: #7cdfff;
  color: #000;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
`;

const CaptureButton = styled(Button)`
  background-color: #7cdfff;
  color: #000;
`;

interface IdentityVerificationProps {
  active: boolean;
  token?: string;
}

const FACING_MODE_USER = 'user';
const FACING_MODE_ENVIRONMENT = 'environment';

const videoConstraints = {
  width: 720,
  height: 360,
  facingMode: FACING_MODE_USER,
};

const IdentityVerification = (props: IdentityVerificationProps) => {
  const { active, token } = props;

  const [isCaptureEnable, setCaptureEnable] = useState(false);
  const webcamRef = useRef<Webcam>(null);
  const [url, setUrl] = useState<string | null>(null);
  const [progressState, setProgressState] = React.useState(1);
  const [isIDCardDocumentSelected, setIsIDCardDocumentSelected] =
    useState(false);
  const [facingMode, setFacingMode] = React.useState(FACING_MODE_USER);

  const [kyc, setRecoilKyc] = useRecoilState(kycState);

  const submitKyc = useSubmitKyc();
  const fileToUrl = useGenerateURLImage();

  const handleChangeFacingMode = React.useCallback(() => {
    setFacingMode((prevState) =>
      prevState === FACING_MODE_USER
        ? FACING_MODE_ENVIRONMENT
        : FACING_MODE_USER
    );
  }, []);

  async function handleSubmittingKyc() {
    const userPhoto = await base64ToFile('userPhoto.jpg', url!);
    const documentPhoto = await base64ToFile(
      'documentPhoto.jpg',
      kyc.document_photo
    );

    const photos = await fileToUrl.mutateAsync([userPhoto, documentPhoto]);

    submitKyc.mutate({
      ...kyc,
      user_photo: photos.urls[0],
      document_photo: photos.urls[1],
      token,
    });
  }

  React.useEffect(() => {
    if (progressState === 7) {
      handleSubmittingKyc();
    }
  }, [progressState]);

  const capture = React.useCallback(() => {
    const imageSrc = webcamRef.current?.getScreenshot();
    if (imageSrc) {
      setUrl(imageSrc);
      if (progressState !== 6) {
        setProgressState((state) => state + 1);
      }
    }
  }, [webcamRef, progressState, kyc]);

  const renderBody = () => {
    switch (progressState) {
      case 1:
        return (
          <React.Fragment>
            <Label> Select your document issuing country/region</Label>
            <Input
              size='large'
              placeholder='large size'
              value={'VietNam (Việt Nam)'}
              disabled={true}
              prefix={<img src={VietNamIcon} style={{ width: '50%' }} />}
              style={{ marginBottom: '2em' }}
            />
            <SubTitle>Use a valid government-issued document</SubTitle>
            <Label>
              Only the following documents listed below will be accepted, all
              other documents will be rejected
            </Label>

            <div
              style={{
                backgroundColor: '#f7f7f8',
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginTop: '2em',
              }}
            >
              <ListItemButton style={{ padding: '1em 0.5em' }}>
                <ListItemIcon>
                  <InboxIcon />
                </ListItemIcon>
                <ListItemText
                  primary='ID Card'
                  style={{ fontWeight: 700 }}
                  onClick={() => setIsIDCardDocumentSelected((state) => !state)}
                />
                <CheckCircleRoundedIcon
                  style={{ color: isIDCardDocumentSelected ? 'green' : '' }}
                  onClick={() => setIsIDCardDocumentSelected((state) => !state)}
                />
              </ListItemButton>
            </div>
          </React.Fragment>
        );

      case 2:
        return (
          <React.Fragment>
            <img
              src='https://swaper.com/blog/wp-content/uploads/verify-identity-768x402.jpg'
              alt='image'
              style={{ height: '45%' }}
            />

            <SubTitle variant='h6'>
              You are about to upload your identity card. Please ensure that:
            </SubTitle>

            <Label style={{ fontWeight: 500, marginBottom: '0.5em' }}>
              * This is your own government-issued document that is not expired
            </Label>
            <Label style={{ fontWeight: 500, marginBottom: '0.5em' }}>
              * This is an original document, not a scan or copy
            </Label>
            <Label style={{ fontWeight: 500, marginBottom: '0.5em' }}>
              * Remove any card holders or covers to avoid reflections or blur
            </Label>
          </React.Fragment>
        );

      case 3:
        return !isCaptureEnable ? (
          <React.Fragment>
            <SubTitle variant='h6' style={{ fontSize: '1rem' }}>
              Upload your ID Card
            </SubTitle>

            <div
              style={{
                position: 'relative',
              }}
            >
              <div
                style={{
                  borderStyle: 'dashed',
                  borderColor: 'gray',
                  opacity: 0.2,
                }}
              >
                <img src={IDCardImageSrc} />
              </div>

              <AddButton
                onClick={() => {
                  setCaptureEnable(true);
                }}
              >
                + Add
              </AddButton>
            </div>
          </React.Fragment>
        ) : (
          <>
            <div>
              <Webcam
                audio={false}
                width='100%'
                height='100%'
                ref={webcamRef}
                screenshotFormat={TYPE_FILE}
                videoConstraints={{
                  ...videoConstraints,
                  facingMode,
                }}
              />
            </div>
            <CaptureButton onClick={capture}>Capture</CaptureButton>

            <FlipCameraIosIcon
              onClick={() => handleChangeFacingMode()}
              style={{ marginLeft: '0.5em' }}
            />
          </>
        );

      case 4:
        return (
          url && <img style={{ height: '12rem' }} src={url} alt='Screenshot' />
        );

      case 5:
        return (
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              height: '100%',
            }}
          >
            <img
              src={DocumentUploadedImage}
              style={{ height: '7rem', width: '37%' }}
            />
            <SubTitle>Document uploaded</SubTitle>
            <Typography>
              Click continue button to add a selfie of yourself
            </Typography>
          </div>
        );

      case 6:
        const noticeYES = (content: string) => {
          return (
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                margin: '0.5em 0',
              }}
            >
              <DoneIcon style={{ color: 'green', marginRight: '0.5em' }} />
              <Typography>{content}</Typography>
            </div>
          );
        };
        const noticeNO = (content: string) => {
          return (
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                margin: '0.5em 0',
              }}
            >
              <CloseIcon style={{ color: 'red', marginRight: '0.5em' }} />
              <Typography>{content}</Typography>
            </div>
          );
        };
        return (
          <div>
            <SubTitle variant='h6'>Take a selfie</SubTitle>
            <SubTitle variant='h6'>Example </SubTitle>
            <img
              style={{ width: '50%', marginBottom: '0.5em' }}
              src={SelfieExampleImage}
            />
            {noticeYES('Take a selfie of yourself with a neutral expression')}
            {noticeYES('Take a selfie of yourself with a neutral expression')}
            {noticeYES('Take a selfie of yourself with a neutral expression')}
            {noticeNO('Do not crop your ID or use screenshots of your ID')}
            {noticeNO(
              'Do not hide or alter parts of your face (No hats/beauty images/filters/headgear'
            )}

            <Typography
              style={{ color: '#000', fontWeight: 500, marginBottom: '0.5em' }}
            >
              File size must be between 10KB and 5120KB in ..jpg/.peg/.png
              format
            </Typography>
            {!isCaptureEnable ? (
              <div
                style={{
                  width: '100%',
                  height: '12rem',
                  backgroundColor: '#eeeeee',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  margin: '1em 0 2em 0',
                }}
                onClick={() => {
                  setCaptureEnable(true);
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <CameraAltIcon />
                  <Typography>Take a selfie</Typography>
                </div>
              </div>
            ) : url ? (
              <img style={{ height: '12rem' }} src={url} alt='Screenshot' />
            ) : (
              <>
                <div>
                  <Webcam
                    audio={false}
                    width='100%'
                    height='100%'
                    ref={webcamRef}
                    screenshotFormat='image/jpeg'
                    videoConstraints={{
                      ...videoConstraints,
                      facingMode,
                    }}
                  />
                </div>
                <CaptureButton onClick={capture}>Capture</CaptureButton>
                <FlipCameraIosIcon
                  onClick={() => handleChangeFacingMode()}
                  style={{ marginLeft: '0.5em' }}
                />
              </>
            )}
          </div>
        );
      case 7:
        return (
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: '10em',
            }}
          >
            <CheckCircleRoundedIcon
              style={{ width: '5em', height: '5em', color: 'green' }}
            />
            <Typography variant='h3'>Thank you!</Typography>
            <Typography variant='h6'>Your submission has been sent</Typography>
          </div>
        );
    }
  };

  return (
    <Container active={active}>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          height: '100%',
        }}
      >
        <div>
          {progressState !== 1 && progressState !== 7 && (
            <ArrowBackIcon
              onClick={() => {
                if (progressState === 5) {
                  setProgressState((state) => state - 2);
                } else {
                  setProgressState((state) => state - 1);
                }
                setCaptureEnable(false);
                if (progressState === 6) {
                  setUrl(null);
                }
              }}
              style={{ marginBottom: '1em' }}
            />
          )}
          {progressState !== 7 && (
            <Title variant='h5'>Identity Verification</Title>
          )}
          {renderBody()}
        </div>
        <div style={{ display: 'flex', flexDirection: 'row' }}>
          {progressState === 4 || (progressState === 6 && url) ? (
            <Button
              style={{
                margin: '3em 0',
                marginRight: '0.6em',
                backgroundColor: '#d2dad7',
              }}
              onClick={() => {
                if (progressState === 6) {
                  setUrl(null);
                  setCaptureEnable(true);
                  return;
                }
                setProgressState((state) => state - 1);
              }}
            >
              Retake
            </Button>
          ) : (
            <Button
              style={{
                margin: '3em 0',
                marginRight: '0.6em',
                display: progressState !== 3 ? 'none' : 'block',
                backgroundColor: '#d2dad7',
              }}
              onClick={() => setProgressState((state) => state - 1)}
            >
              Previous
            </Button>
          )}

          {progressState !== 7 && (
            <ContinueButton
              disabled={
                !isIDCardDocumentSelected ||
                (progressState === 3 && !url) ||
                (progressState === 6 && !url)
              }
              onClick={() => {
                setProgressState((state) => state + 1);

                if (progressState === 4) {
                  setRecoilKyc((state) => ({
                    ...state,
                    document_photo: url || '',
                  }));
                  setUrl(null);
                  return;
                }

                if (progressState === 6) {
                  console.log('url', url, 'is step 6');
                  setRecoilKyc({ ...kyc, user_photo: url || '' });
                  console.log('finish', url, 'is step 6');
                  return;
                }
                if (progressState === 5) {
                  setCaptureEnable(false);
                }
              }}
            >
              Continue
            </ContinueButton>
          )}
        </div>
      </div>
    </Container>
  );
};

export default IdentityVerification;
