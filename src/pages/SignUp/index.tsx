import icon_fb from 'assets/images/icon_fb.svg';
import { User } from 'firebase/auth';
import { useSignUp } from 'hooks/auth/signUp/useSignUp';
import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { useSetRecoilState } from 'recoil';
import { userState } from 'recoil/users/state';
import { signInWithGoogleAuth } from 'services/firebase';
import Style from './style';
import { lowerCase } from 'lodash';
import icon_gg from 'assets/images/icon_gg.svg';
import Loading from 'components/Loading';
import { toast } from 'react-toastify';
import { setLocalStorage } from 'helpers/setTitleDocument';

const MIN_SAFE_DATE = '1900-01-01';
const MAX_SAFE_DATE = '2010-01-01';
type InputsSignUp = {
  email: string;
  password: string;
  username: string;
  fist_name: string;
  last_name: string;
  date: Date;
};

export default function SignUpPage() {
  const setUserState = useSetRecoilState(userState);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<InputsSignUp>();
  const navigate = useNavigate();
  const mutation = useSignUp();

  React.useEffect(() => {
    mutation.isSuccess &&
      setUserState({
        ...mutation.data.data,
        isLoggedIn: true,
      }) &&
      navigate('/home') &&
      setLocalStorage('user', JSON.stringify(mutation.data.data));
  }, [mutation.isSuccess]);
  const handleSignUpGoogle = (data: User) => {
    const splitName = data.displayName?.trim().split(' ') || [];
    mutation.mutate({
      photo_url: data.photoURL,
      email: data.email,
      uid_gg: data.uid,
      emailVerified: data.emailVerified,
      username: lowerCase(
        data.displayName
          ?.split('')
          .map((item) => item.trim())
          .join('')
      ),
      first_name: splitName?.slice(0, splitName.length - 1).join(' '),
      last_name: splitName[splitName.length - 1],
      type: 'google',
    });
  };

  const handleSignUpManual = (data: InputsSignUp) => {
    mutation.mutate({
      email: data.email,
      emailVerified: false,
      first_name: data.fist_name,
      last_name: data.last_name,
      password: data.password,
      username: data.username,
    });
  };
  return (
    <Style>
      <React.Fragment>
        <form
          className='form-sign-up'
          onSubmit={handleSubmit(handleSignUpManual)}
        >
          <div className='form-sign-up__header d-flex flex-wrap'>
            <div className='col-6'>
              <div className='form-sign-up__header--welcome'>
                Welcome to <span>Be The Heroes</span>
              </div>
              <div className='form-sign-up__header--type'>Sign Up</div>
            </div>
            <div className='col-6'>
              <div className='form-sign-up__header--sign-up text-right'>
                Already have an account?
              </div>
              <div
                className='form-sign-up__header--sign-up-link text-right'
                onClick={() => navigate('/auth/sign-in')}
              >
                Sign In
              </div>
            </div>
          </div>
          {mutation.isLoading && <Loading cover='content' />}
          {!mutation.isLoading && (
            <React.Fragment>
              <div className='form-sign-up__content col-12'>
                <React.Fragment>
                  <div className='form-sign-up__content--form-input'>
                    <label className='w-100'>Enter email address</label>
                    <input
                      type='email'
                      placeholder='example@example.com'
                      {...register('email', { required: true })}
                    />
                  </div>

                  <div className='form-sign-up__content--form-input d-flex'>
                    <div
                      className='w-50'
                      style={{
                        paddingRight: '0.5rem',
                      }}
                    >
                      <label className='w-100'>Enter First Name</label>
                      <input
                        placeholder='Please enter First Name'
                        {...register('fist_name', { required: true })}
                      />
                    </div>
                    <div
                      className='w-50'
                      style={{
                        paddingLeft: '0.5rem',
                      }}
                    >
                      <label className='w-100'>Enter Last Name</label>
                      <input
                        placeholder='Please enter First Name'
                        {...register('last_name', { required: true })}
                      />
                    </div>
                  </div>
                  <div className='form-sign-up__content--form-input'>
                    <label className='w-100'>Enter date of birth</label>
                    <input
                      min={MIN_SAFE_DATE}
                      max={MAX_SAFE_DATE}
                      type='date'
                      {...register('date', { required: true })}
                    />
                  </div>
                  <div className='form-sign-up__content--form-input'>
                    <label className='w-100'>Enter password</label>
                    <input
                      placeholder='Password'
                      type='password'
                      {...register('password', { required: true })}
                    />
                  </div>
                </React.Fragment>
              </div>

              <div className='form-sign-up__footer col-12'>
                <button className='btn btn--sign-up w-100'>Sign Up</button>
              </div>
            </React.Fragment>
          )}
        </form>
        <div className='plugin w-100 d-flex flex-wrap justify-content-center'>
          <div
            className='plugin-google'
            onClick={() =>
              signInWithGoogleAuth().then((res) => handleSignUpGoogle(res.user))
            }
          >
            Sign Up With Google
            <img src={icon_gg} alt={'icon-gg'} className='plugin-icon'></img>
          </div>
          <div
            className='plugin-facebook'
            style={{
              marginLeft: '1rem',
            }}
          >
            <img src={icon_fb} alt={'icon-fb'} className='plugin-icon'></img>
          </div>
        </div>
      </React.Fragment>
    </Style>
  );
}
