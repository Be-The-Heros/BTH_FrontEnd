import { useCheckOtp } from 'hooks/auth/signUp/useCheckOTP';
import React from 'react';
import { useForm } from 'react-hook-form';

export const CheckingOTP = () => {
  const mutationOtp = useCheckOtp();
  const { register, watch } = useForm<{
    otp: number;
  }>();
  const handleOTP = () => {
    mutationOtp.mutate({
      otp: watch('otp'),
    });
  };

  return (
    <React.Fragment>
      <div className='form-sign-up__content col-12'>
        <div className='form-sign-up__content--form-input'>
          <label className='w-100'>Enter OTP</label>
          <input
            type='number'
            placeholder='example@example.com'
            maxLength={6}
            {...register('otp', {
              required: true,
              maxLength: 6,
            })}
          />
        </div>
      </div>
      <div className='form-sign-up__footer col-12'>
        <button className='btn btn--sign-up w-100' onClick={() => handleOTP()}>
          Check OTP
        </button>
      </div>
    </React.Fragment>
  );
};
