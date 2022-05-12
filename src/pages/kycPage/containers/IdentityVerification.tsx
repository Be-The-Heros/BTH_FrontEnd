import { Input } from 'antd';
import { MAX_SAFE_DATE, MIN_SAFE_DATE } from 'pages/SignUp';
import React from 'react';
import { Control } from 'react-hook-form';
import { useRecoilState } from 'recoil';
import { kycState } from 'recoil/kycState/state';
import Style from './style';

type FormInputs = {
  fullname: string;
  date_of_birth: string;
  document_id: number;
};
interface IdentityVerificationProps {
  control: Control<KycState, any>;
  errors?: any;
}
export const IdentityVerification = () => {
  const [kyc, setKycState] = useRecoilState(kycState);

  return (
    <Style className='identity-verification'>
      <div className='form-input'>
        <label>Nationality</label>
        <Input placeholder='National' value='Việt Nam' disabled />
      </div>

      <div className='form-input'>
        <label>National ID</label>
        <Input
          placeholder='example: 01212484423'
          type='number'
          required
          value={kyc.document_id}
          onChange={(e) => setKycState({ ...kyc, document_id: e.target.value })}
        />
      </div>

      <div className='form-input'>
        <label>Full name</label>
        <Input
          placeholder='example: Nguyen Van A'
          type='text'
          value={kyc.fullname}
          onChange={(e) => {
            setKycState({ ...kyc, fullname: e.target.value });
          }}
        />
      </div>

      <div className='form-input'>
        <label>Date Of Birth</label>
        <Input
          value={kyc.date_of_birth}
          onChange={(e) =>
            setKycState({ ...kyc, date_of_birth: e.target.value })
          }
          min={MIN_SAFE_DATE}
          max={MAX_SAFE_DATE}
          type='date'
        />
      </div>
    </Style>
  );
};
