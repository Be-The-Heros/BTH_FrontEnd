import icon_fb from 'assets/images/icon_fb.svg';
import icon_gg from 'assets/images/icon_gg.svg';
import Loading from 'components/Loading';
import { User } from 'firebase/auth';
import { isEmptyValue } from 'helpers';
import { setLocalStorage } from 'helpers/setTitleDocument';
import { useSignUp } from 'hooks/auth/signUp/useSignUp';
import { lowerCase } from 'lodash';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { useRecoilState } from 'recoil';
import { userState } from 'recoil/users/state';
import { signInWithGoogleAuth } from 'services/firebase';
import Style from './style';
const MIN_SAFE_DATE = '1900-01-01';
const MAX_SAFE_DATE = '2010-01-01';
type InputsSignUp = {
  email: string;
  password: string;
  username: string;
  fist_name: string;
  last_name: string;
  date: Date;
  otp: number;
};

export default function SignUpPage() {
  const [user, setUserState] = useRecoilState(userState);
  const { register, handleSubmit } = useForm<InputsSignUp>();
  const navigate = useNavigate();
  const mutationSignUp = useSignUp();

  React.useEffect(() => {
    if (mutationSignUp.isSuccess) {
      setLocalStorage('user', JSON.stringify(mutationSignUp.data.data));
      setUserState({
        ...mutationSignUp.data.data,
        isLoggedIn: true,
      });
    }
  }, [mutationSignUp.isSuccess]);

  const handleSignUpGoogle = (data: User, token: string) => {
    const splitName = data.displayName?.trim().split(' ') || [];
    mutationSignUp.mutate({
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
      accessToken: token,
    });
  };

  const handleSignUpManual = (data: InputsSignUp) => {
    mutationSignUp.mutate({
      email: data.email,
      first_name: data.fist_name,
      last_name: data.last_name,
      password: data.password,
      username: data.username,
      type: 'manual',
      date_of_birth: data.date,
    });
  };

  const renderForm = () => {
    if (mutationSignUp.isLoading) {
      return <Loading cover='content' />;
    }
    return (
      <form onSubmit={handleSubmit(handleSignUpManual)}>
        <div className='form-sign-up__content col-12'>
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
                {...register('fist_name', {
                  required: true,
                  pattern: /^([^0-9]*)$/,
                })}
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
                {...register('last_name', {
                  required: true,
                  pattern: /^([^0-9]*)$/,
                })}
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
        </div>

        <div className='form-sign-up__footer col-12'>
          <button className='btn btn--sign-up w-100'>Sign Up</button>
        </div>
      </form>
    );
  };
  return (
    <Style>
      <React.Fragment>
        <div className='form-sign-up'>
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
          {renderForm()}
        </div>
        <div className='plugin w-100 d-flex flex-wrap justify-content-center'>
          <div
            className='plugin-google'
            onClick={() =>
              signInWithGoogleAuth().then(async (res) => {
                const token = await res.user.getIdToken();
                handleSignUpGoogle(res.user, token);
              })
            }
          >
            Sign Up With Google
            <img src={icon_gg} alt={'icon-gg'} className='plugin-icon'></img>
          </div>
          {/* <div
            className='plugin-facebook'
            style={{
              marginLeft: '1rem',
            }}
          >
            <img src={icon_fb} alt={'icon-fb'} className='plugin-icon'></img>
          </div> */}
        </div>
      </React.Fragment>
    </Style>
  );
}
