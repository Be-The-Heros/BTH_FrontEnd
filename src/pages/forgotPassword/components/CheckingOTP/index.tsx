import React, { useState } from 'react';

const LENGTH_OTP = 6;
interface CheckingOTPProps {
  goBack: () => void;
}
export const CheckingOTP = (props: CheckingOTPProps) => {
  const { goBack } = props;
  const [otpValue, setOtpValue] = useState('');
  return (
    <React.Fragment>
      <div className='form-forgot-password__content col-12'>
        <div className='form-forgot-password__content--form-input'>
          <label className='w-100'>Enter OTP value</label>
          <input
            type='number'
            placeholder='example: 567900'
            value={otpValue}
            onChange={(e) => setOtpValue(e.target.value)}
          />
        </div>
      </div>
      <div className='form-forgot-password__footer col-12 d-flex flex-wrap'>
        <div className='form-forgot-password__footer-fg w-50'>
          Resend email.
        </div>
        <div
          className='form-forgot-password__footer-fg w-50 text-right'
          onClick={() => goBack()}
        >
          Go Back?
        </div>
        <button
          className='btn btn--forgot-password w-100'
          disabled={otpValue.length !== LENGTH_OTP}
        >
          Check OTP
        </button>
      </div>
    </React.Fragment>
  );
};
