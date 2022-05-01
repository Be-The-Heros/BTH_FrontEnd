import { Input } from 'antd';
import React from 'react';
import { useRecoilState } from 'recoil';
import { kycState } from 'recoil/kycState/state';
import Style from './style';
export const AdditionalInformation = () => {
  const [kyc, setKycState] = useRecoilState(kycState);

  return (
    <Style className='additional-information'>
      <div className='form-input'>
        <label>Residential Address</label>
        <Input
          placeholder='Example: 07 Dinh Thi Hoa, An Hai Bac, Da Nang'
          value={kyc.residential_address}
          onChange={(e) =>
            setKycState({ ...kyc, residential_address: e.target.value })
          }
        />
      </div>
      <div className='form-input'>
        <label>City</label>
        <Input
          placeholder='Example: Da Nang'
          value={kyc.province}
          onChange={(e) => setKycState({ ...kyc, province: e.target.value })}
        />
      </div>
    </Style>
  );
};
