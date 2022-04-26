import React from 'react';
import Style from './style';
import VerifyLogo from 'assets/icons/verify.svg';

import { AiOutlineIdcard } from 'react-icons/ai';
import { RiGovernmentLine, RiVoiceRecognitionLine } from 'react-icons/ri';
export const KycPage = () => {
  return (
    <Style className='kyc-page'>
      <div className='kyc-page-title'>Personal Verification</div>

      <div className='kyc-page-content d-flex justify-content-evenly'>
        <div className='kyc-page-content-description col-md-3 d-flex flex-wrap justify-content-center'>
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
              Your document picture is not clearly
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
            <div className='kyc-page-content-verification__detail d-flex  align-items-center'>
              <AiOutlineIdcard /> Personal information
            </div>
            <div className='kyc-page-content-verification__detail d-flex  align-items-center'>
              <RiGovernmentLine /> Government-issued ID
            </div>
            <div className='kyc-page-content-verification__detail d-flex   align-items-center'>
              <RiVoiceRecognitionLine /> Facial recognition
            </div>
          </div>
        </div>
      </div>
    </Style>
  );
};
