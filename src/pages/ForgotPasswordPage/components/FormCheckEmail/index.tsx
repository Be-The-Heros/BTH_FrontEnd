import React from 'react';
import { useNavigate } from 'react-router';

interface BoxEmailInterface {
  setEmail: (email: string) => void;
  sendOtp: () => void;
  btnDisabled?: boolean;
}

export const FormCheckEmail = (props: BoxEmailInterface) => {
  const navigate = useNavigate();

  const { setEmail, sendOtp, btnDisabled } = props;

  return (
    <React.Fragment>
      <div className='form-forgot-password__content col-12'>
        <div className='form-forgot-password__content--form-input'>
          <label className='w-100'>Enter email address</label>
          <input
            type='text'
            placeholder='example@example'
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </div>
      </div>

      <div className='form-forgot-password__footer col-12'>
        <div
          className='form-forgot-password__footer-fg text-right'
          onClick={() => navigate('/auth/sign-in')}
        >
          Go to Sign In?
        </div>
        <button
          className='btn btn--forgot-password w-100'
          onClick={sendOtp}
          disabled={btnDisabled}
        >
          Send OTP
        </button>
      </div>
    </React.Fragment>
  );
};
