import icon_fb from 'assets/images/icon_fb.svg';
import icon_gg from 'assets/images/icon_gg.svg';
import Loading from 'components/Loading';
import { User } from 'firebase/auth';
import { setLocalStorage } from 'helpers/setTitleDocument';
import { useSignIn } from 'hooks/auth/signIn';
import React from 'react';
import { useForm } from 'react-hook-form';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { useNavigate } from 'react-router';
import { useSetRecoilState } from 'recoil';
import { userState } from 'recoil/users/state';
import { signInWithGoogleAuth } from 'services/firebase';
import StyleSignIn from './style';

<<<<<<< HEAD
import {} from "components/Button";
import Style from "./style";
import {
  useLoginByEmail,
  useRegisterUserByGoogle,
  UseRegisterUserByGoogle,
} from "hooks/user";
import { SubmitHandler, useForm } from "react-hook-form";

type InputsLogin = {
=======
interface InputGroup {
>>>>>>> 2a9936c32b39764f6e02f8e3b0f4159ab10c1115
  email: string;
  password: string;
}
const SignInPage = () => {
  const [isShowPassword, setIsShowPassword] = React.useState(true);
  const setUser = useSetRecoilState(userState);
  const {
    register,
    handleSubmit,
    // formState: { errors },
  } = useForm<InputGroup>();
  const mutation = useSignIn();
  const navigate = useNavigate();
  const toggleShowPassword = () => setIsShowPassword(!isShowPassword);
  const handleLoginGoogle = (payload: User) => {
    mutation.mutate({
      email: payload.email,
      uid_gg: payload.uid,
      photo_url: payload.photoURL,
      type: 'google',
    });
  };
  const handleSignInManual = (data: InputGroup) => {
    mutation.mutate({
      email: data.email,
      password: data.password,
      type: 'manual',
    });
  };
  React.useEffect(() => {
    if (mutation.isSuccess) {
      setUser({
        ...mutation.data.data,
        isLoggedIn: true,
      });
      setLocalStorage('user', JSON.stringify(mutation.data.data));
      navigate('/home');
    }
  }, [mutation.isSuccess]);
  return (
    <StyleSignIn>
      <form
        className='form-sign-in'
        onSubmit={handleSubmit(handleSignInManual)}
      >
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
        {mutation.isLoading && <Loading cover='content' />}
        {!mutation.isLoading && (
          <React.Fragment>
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

              <button className='btn btn--sign-in w-100'>Sign in</button>
            </div>
          </React.Fragment>
        )}
      </form>
      <div className='plugin w-100 d-flex flex-wrap justify-content-center'>
        <div
          className='plugin-google'
          style={{
            marginLeft: '1rem',
          }}
          onClick={() =>
            signInWithGoogleAuth().then((res) => handleLoginGoogle(res.user))
          }
        >
          Sign In with Google{' '}
          <img src={icon_gg} alt={'icon-fb'} className='plugin-icon' />
        </div>
        <div
          className='plugin-facebook'
          style={{
            marginLeft: '1rem',
          }}
        >
          <img src={icon_fb} alt={'icon-fb'} className='plugin-icon' />
        </div>
      </div>
    </StyleSignIn>
  );
};

export default SignInPage;
