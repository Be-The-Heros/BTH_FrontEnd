import icon_fb from 'assets/images/icon_fb.svg';
import icon_gg from 'assets/images/icon_gg.svg';
import { useLoginByEmail, useRegisterUserByGoogle } from 'hooks/user';
import { FormLoginAttributes, UseRegisterUserByGoogle } from 'hooks/user/types';
import React, { useEffect } from 'react';
import { GoogleLogin, GoogleLoginResponse } from 'react-google-login';
import { SubmitHandler, useForm } from 'react-hook-form';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import { useSetRecoilState } from 'recoil';
import { userState } from 'recoil/users/state';
import {
  signInWithFacebookAuth,
  signInWithGoogleAuth,
} from 'services/firebase';
import StyleSignIn from './style';

const CLIENT_GG_ID =
  '966248665452-u9mhhvcofgfr7b0h7nnhf03j6krt8gv7.apps.googleusercontent.com';
const SignInPage = () => {
  const [isShowPassword, setIsShowPassword] = React.useState(true);
  const setUser = useSetRecoilState(userState);

  const {
    register,
    handleSubmit,
    // formState: { errors },
  } = useForm<FormLoginAttributes>();

  const navigate = useNavigate();
  const mutationLoginByGoogle = useRegisterUserByGoogle();
  const mutationLoginByEmail = useLoginByEmail();
  const toggleShowPassword = () => setIsShowPassword(!isShowPassword);

  useEffect(() => {
    if (mutationLoginByGoogle.data) {
      console.log(mutationLoginByGoogle.data);
      const token = mutationLoginByGoogle.data as any;
      localStorage.setItem('token', token.token);
      toast.success('Login by google success', {
        icon: '🚀',
      });
      setUser((state) => {
        return {
          ...state,
          isLoggedIn: true,
        };
      });
      navigate('/');
    }
    if (mutationLoginByGoogle.isError) {
      toast.error('Something went wrong');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mutationLoginByGoogle.data, mutationLoginByGoogle.isError]);

  useEffect(() => {
    if (mutationLoginByEmail.data) {
      console.log(mutationLoginByEmail.data);
      const token = mutationLoginByEmail.data as any;
      localStorage.setItem('token', token.token);
      toast.success('Login by email success', {
        icon: '🚀',
      });
      setUser((state) => {
        return {
          ...state,
          isLoggedIn: true,
        };
      });
      navigate('/');
    }
    if (mutationLoginByEmail.isError) {
      toast.error('your email or password is wrong');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mutationLoginByEmail.data, mutationLoginByEmail.isError]);

  const handleResponseGoogle = (response: GoogleLoginResponse) => {
    const { email, imageUrl, familyName, givenName } = response.profileObj;
    const { accessToken } = response;
    const data: UseRegisterUserByGoogle = {
      email,
      firstName: familyName,
      lastName: givenName,
      avatar: imageUrl,
      thirdPartyTokens: accessToken,
    };
    mutationLoginByGoogle.mutate(data);
  };

  const onSubmit: SubmitHandler<FormLoginAttributes> = (data) => {
    mutationLoginByEmail.mutate(data);
  };

  return (
    <StyleSignIn>
      <div className='form-sign-in'>
        <div className='form-sign-in__header d-flex flex-wrap'>
          <div className='col-6'>
            <div className='form-sign-in__header--welcome'>
              Welcome to <span>Be The Heroes</span>
            </div>
            <div className='form-sign-in__header--type'>Sign in</div>
          </div>
          <div className='col-6'>
            <div className='form-sign-in__header--sign-up text-right'>
              Don't have an account?
            </div>
            <div
              className='form-sign-in__header--sign-up-link text-right'
              onClick={() => navigate('/auth/sign-up')}
            >
              Sign up
            </div>
          </div>
        </div>
        <div className='form-sign-in__content col-12'>
          <div className='form-sign-in__content--form-input'>
            <label className='w-100'>Enter username or email address</label>
            <input
              type='email'
              placeholder='Username or email address'
              {...register('email', { required: true })}
            />
          </div>
          <div className='form-sign-in__content--form-input'>
            <label className='w-100'>Enter your password</label>
            <input
              type={isShowPassword ? 'password' : 'text'}
              placeholder='Password'
              {...register('password', { required: true })}
            />
            {isShowPassword ? (
              <AiOutlineEyeInvisible onClick={() => toggleShowPassword()} />
            ) : (
              <AiOutlineEye onClick={() => toggleShowPassword()} />
            )}
          </div>
        </div>

        <div className='form-sign-in__footer col-12'>
          <div className='d-flex justify-content-end'>
            <span
              className=' form-sign-in__footer-fg'
              onClick={() => navigate('/auth/forgot-password')}
            >
              Forgot Password?
            </span>
          </div>

          <div className='text-danger mb-2'>
            {mutationLoginByEmail.isError
              ? 'Your email or password is invalid'
              : null}
          </div>
          <button
            className='btn btn--sign-in w-100'
            onClick={handleSubmit(onSubmit)}
          >
            Sign in
          </button>
        </div>
      </div>
      <div className='plugin w-100 d-flex flex-wrap justify-content-center'>
        <GoogleLogin
          clientId={CLIENT_GG_ID}
          render={({ onClick }) => (
            <div className='plugin-google' onClick={() => onClick()}>
              <img src={icon_gg} alt={'icon-gg'} className='plugin-icon' />
              Sign In with Google
            </div>
          )}
          buttonText='Login'
          onSuccess={(response) =>
            handleResponseGoogle(response as GoogleLoginResponse)
          }
          onFailure={handleResponseGoogle}
          cookiePolicy={'single_host_origin'}
        />

        <button
          onClick={() =>
            signInWithGoogleAuth().then((response) => {
              console.log(response);
            })
          }
        >
          Login gg
        </button>

        <button
          onClick={() =>
            signInWithFacebookAuth().then((response) => {
              console.log(response);
            })
          }
        >
          Login fb
        </button>
        <div
          className='plugin-facebook'
          style={{
            marginLeft: '1rem',
          }}
        >
          <img src={icon_fb} alt={'icon-fb'} className='plugin-icon'></img>
        </div>
      </div>
    </StyleSignIn>
  );
};

export default SignInPage;
