import { Button, Modal, Progress } from 'antd';
import VerifyLogo from 'assets/icons/verify.svg';
import clsx from 'clsx';
import Loading from 'components/Loading';
import { base64ToFile } from 'helpers/base64ToFile';
import { useGenerateURLImage } from 'hooks/image/useCreateImageURL';
import { useGetKycStatus } from 'hooks/kyc/kycStatus/useGetKycStatus';
import { useSubmitKyc } from 'hooks/kyc/submitKyc/useSubmitKyc';
import React from 'react';
import { AiOutlineIdcard } from 'react-icons/ai';
import { MdArrowBack } from 'react-icons/md';
import { RiGovernmentLine, RiVoiceRecognitionLine } from 'react-icons/ri';
import { toast } from 'react-toastify';
import { useRecoilValue, useResetRecoilState } from 'recoil';
import { kycState } from 'recoil/kycState/state';
import { AdditionalInformation } from './containers/AdditionalInformation';
import { FormConfirmInformation } from './containers/FormConfirmInformation';
import { FormSelfie } from './containers/FormSelfi';
import { FormUploadCard } from './containers/FormUploadCard';
import { IdentityVerification } from './containers/IdentityVerification';
import { SuggestVerificationMobile } from './containers/SuggestVerificationMobile';
import { strip } from 'number-precision';
import Style from './style';

type stepKyc =
  | 'IdentityVerification'
  | 'AdditionalInformation'
  | 'FormSelectCountry'
  | 'FormUploadCard'
  | 'FormConfirm';

const TOTAL_STEP = 6;

export const KycPage = () => {
  const [isOpenModal, setIsOpenModal] = React.useState(false);
  const [stepState, setStepState] = React.useState(1);
  const kyc = useRecoilValue(kycState);
  const resetState = useResetRecoilState(kycState);

  // * API
  const kycStatus = useGetKycStatus();
  const kycSubmitMutation = useSubmitKyc();
  const fileToUrl = useGenerateURLImage();

  React.useEffect(() => {
    kycStatus.mutate('');
  }, []);

  React.useEffect(() => {
    kycSubmitMutation.isSuccess && setIsOpenModal(false);
  }, [kycSubmitMutation.isSuccess]);
  const onSubmitForm = async () => {
    try {
      const userPhoto = await base64ToFile('userPhoto.jpg', kyc.user_photo);
      const documentPhoto = await base64ToFile(
        'documentPhoto.jpg',
        kyc.document_photo
      );

      const photos = await fileToUrl.mutateAsync([userPhoto, documentPhoto]);

      await kycSubmitMutation.mutateAsync({
        ...kyc,
        user_photo: photos.urls[0],
        document_photo: photos.urls[1],
      });
      await kycStatus.mutateAsync('');
    } catch (error) {
      console.log(error);
      toast.error('Something went wrong');
    }
  };
  const isAttributesNotEmpty = (attributes: Array<keyof KycState>) => {
    return attributes.some(
      (attribute) => !kyc[attribute] || kyc[attribute].trim() === ''
    );
  };

  const isSafeStepForm = () => {
    switch (stepState) {
      case 2:
        return isAttributesNotEmpty([
          'document_id',
          'fullname',
          'date_of_birth',
        ]);
      case 3:
        return isAttributesNotEmpty(['province', 'residential_address']);
      case 4:
        return isAttributesNotEmpty(['document_photo']);
      case 5:
        return isAttributesNotEmpty(['user_photo']);
      default:
        return false;
    }
  };

  const renderFormSubmit = () => {
    switch (stepState) {
      case 1:
        return <SuggestVerificationMobile />;

      case 2:
        return <IdentityVerification />;
      case 3:
        return <AdditionalInformation />;
      case 4:
        return <FormUploadCard />;
      case 5:
        return <FormSelfie />;
      case 6:
        return <FormConfirmInformation />;
    }
  };
  const FooterModal = () => {
    return (
      <div className='d-flex align-items-center justify-content-between'>
        <Progress
          percent={strip((stepState * 100) / TOTAL_STEP, 4)}
          status='active'
          className='col-7'
        />
        <Button
          type='primary'
          className='col-4'
          disabled={isSafeStepForm()}
          onClick={() => {
            if (TOTAL_STEP === stepState) onSubmitForm();
            else setStepState(stepState + 1);
          }}
        >
          {`${TOTAL_STEP === stepState ? 'Submit' : 'Continue'}`}
        </Button>
      </div>
    );
  };

  const btnVerifyClassName = clsx('btn-verify w-100', {
    ['btn-verify--success']: kycStatus.data?.status === 'verified',
    // ['btn-verify--pending']: kycStatus.data?.status === 'pending',
    ['btn-verify--error']: kycStatus.data?.status === 'failed',
    ['btn-verify--wrong']: !kycStatus.data?.status,
  });
  return (
    <Style className='kyc-page'>
      <div className='kyc-page-title'>Personal Verification</div>
      <div className='kyc-page-content d-flex justify-content-evenly'>
        <div className='kyc-page-content-description col-xl-3 col-md-5 d-flex flex-wrap justify-content-center'>
          <div className='kyc-page-content-description__title w-100 text-center'>
            Current Status
          </div>
          <div className='d-flex w-100 mt-5'>
            <img
              src={VerifyLogo}
              className='m-auto'
              alt='verify-logo'
              style={{
                width: '100px',
                height: '100px',
                objectFit: 'fill',
              }}
            />
          </div>

          <div className='kyc-page-content-description__reason text-center'>
            <div className='kyc-page-content-description__reason-title'>
              {kycStatus.data?.status === 'pending' &&
                'You have a pending request'}
              {kycStatus.data?.reason}
            </div>
            <div className='kyc-page-content-description__reason-suggestion'>
              Complete verification to access all features
            </div>
          </div>
        </div>
        <div className='kyc-page-content-verification col-5'>
          <div className='kyc-page-content-description__title w-100'>
            Verification Details
          </div>
          <div className='kyc-page-content-verification__details'>
            <div className='kyc-page-content-verification__detail d-flex  align-items-center mt-3'>
              <AiOutlineIdcard /> Personal information
            </div>
            <div className='kyc-page-content-verification__detail d-flex  align-items-center mt-3'>
              <RiGovernmentLine /> Government-issued ID
            </div>
            <div className='kyc-page-content-verification__detail d-flex   align-items-center mt-3'>
              <RiVoiceRecognitionLine /> Facial recognition
            </div>
          </div>
          <div className='kyc-page-content-verification__detail d-flex   align-items-center mt-3'>
            <Button
              className={btnVerifyClassName}
              onClick={() => setIsOpenModal(true)}
              disabled={
                kycStatus.isLoading ||
                kycStatus.data?.status === 'verified' ||
                kycStatus.data?.status === 'pending'
              }
            >
              {kycStatus.data?.status != 'pending' &&
              kycStatus.data?.status === 'verified'
                ? 'Verified'
                : 'Verify'}
              {kycStatus.data?.status === 'pending' && 'System is checking'}
            </Button>
          </div>
        </div>
      </div>
      <Modal
        visible={isOpenModal}
        onCancel={() => {
          setIsOpenModal(false);
          resetState();
        }}
        footer={[<FooterModal />]}
        title='Personal Verification'
      >
        {stepState != 1 && (
          <Button
            className='d-flex justify-content-center align-items-center'
            onClick={() => setStepState(stepState - 1)}
          >
            <MdArrowBack
              style={{
                fontSize: '1rem',
              }}
            />
            Go back
          </Button>
        )}
        <div className='mt-3'>
          {kycSubmitMutation.isLoading ? <Loading /> : renderFormSubmit()}
        </div>
      </Modal>
    </Style>
  );
};
