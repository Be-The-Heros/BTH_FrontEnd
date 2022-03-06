import icon_fb from "assets/images/icon_fb.svg";
import icon_gg from "assets/images/icon_gg.svg";
import { toast } from "react-toastify";
import React, { useEffect } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useNavigate } from "react-router";
import { useRecoilState } from "recoil";
import { userState } from "recoil/users/state";
import { GoogleLogin } from "react-google-login";

import Style from "./style";
import {
  useLoginByEmail,
  useRegisterUserByGoogle,
  UseRegisterUserByGoogle,
} from "hooks/user";
import { SubmitHandler, useForm } from "react-hook-form";

type InputsLogin = {
  email: string;
  password: string;
};

const SignInPage = () => {
  const [isShowPassword, setIsShowPassword] = React.useState(true);
  const toggleShowPassword = () => setIsShowPassword(!isShowPassword);
  const [_, setUser] = useRecoilState(userState);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<InputsLogin>();

  const navigate = useNavigate();
  const mutationLoginByGoogle = useRegisterUserByGoogle();
  const mutationLoginByEmail = useLoginByEmail();

  useEffect(() => {
    if (mutationLoginByGoogle.data) {
      console.log(mutationLoginByGoogle.data);
      const token = mutationLoginByGoogle.data as any;
      localStorage.setItem("token", token.token);

      toast.success("Login by google success", {
        icon: "🚀",
      });

      setUser((state) => {
        return {
          ...state,
          isLoggedIn: true,
        };
      });
      navigate("/");
    }
    if (mutationLoginByGoogle.isError) {
      toast.error("Something went wrong");
    }
  }, [mutationLoginByGoogle.data, mutationLoginByGoogle.error]);

  useEffect(() => {
    if (mutationLoginByEmail.data) {
      console.log(mutationLoginByEmail.data);
      const token = mutationLoginByEmail.data as any;
      localStorage.setItem("token", token.token);
      toast.success("Login by email success", {
        icon: "🚀",
      });
      setUser((state) => {
        return {
          ...state,
          isLoggedIn: true,
        };
      });
      navigate("/");
    }
    if (mutationLoginByEmail.isError) {
      toast.error("your email or password is wrong");
    }
  }, [mutationLoginByEmail.data, mutationLoginByEmail.error]);

  const responseGoogle = (response) => {
    console.log(response, response.accessToken);
    const { email, imageUrl, familyName, givenName } = response.profileObj;
    const data: UseRegisterUserByGoogle = {
      email,
      firstName: familyName,
      lastName: givenName,
      avatar: imageUrl,
      thirdPartyTokens: response.accessToken,
    };
    mutationLoginByGoogle.mutate(data);
  };

  const onSubmit: SubmitHandler<InputsLogin> = (data) => {
    mutationLoginByEmail.mutate(data);
  };

  return (
    <Style>
      <div className="form-sign-in">
        <div className="form-sign-in__header d-flex flex-wrap">
          <div className="col-6">
            <div className="form-sign-in__header--welcome">
              Welcome to <span>Be The Heroes</span>
            </div>
            <div className="form-sign-in__header--type">Sign in</div>
          </div>
          <div className="col-6">
            <div className="form-sign-in__header--sign-up text-right">
              Don't have an account?
            </div>
            <div
              className="form-sign-in__header--sign-up-link text-right"
              onClick={() => navigate("/auth/sign-up")}
            >
              Sign up
            </div>
          </div>
        </div>
        <div className="form-sign-in__content col-12">
          <div className="form-sign-in__content--form-input">
            <label className="w-100">Enter username or email address</label>
            <input
              type="email"
              placeholder="Username or email address"
              {...register("email", { required: true })}
            />
          </div>
          <div className="form-sign-in__content--form-input">
            <label className="w-100">Enter your password</label>
            <input
              type={isShowPassword ? "password" : "text"}
              placeholder="Password"
              {...register("password", { required: true })}
            />
            {isShowPassword ? (
              <AiOutlineEyeInvisible onClick={() => toggleShowPassword()} />
            ) : (
              <AiOutlineEye onClick={() => toggleShowPassword()} />
            )}
          </div>
        </div>

        <div className="form-sign-in__footer col-12">
          <div className="d-flex justify-content-end">
            <span
              className="  form-sign-in__footer-fg"
              onClick={() => navigate("/auth/forgot-password")}
            >
              Forgot Password?
            </span>
          </div>

          <div className="text-danger mb-2">
            {mutationLoginByEmail.isError
              ? "Your email or password is invalid"
              : null}
          </div>
          <button
            className="btn btn--sign-in w-100"
            onClick={handleSubmit(onSubmit)}
          >
            Sign in
          </button>
        </div>
      </div>
      <div className="plugin w-100 d-flex flex-wrap justify-content-center">
        <GoogleLogin
          clientId="966248665452-u9mhhvcofgfr7b0h7nnhf03j6krt8gv7.apps.googleusercontent.com"
          render={(renderProps) => (
            <div className="plugin-google" onClick={renderProps.onClick}>
              <img src={icon_gg} alt={"icon-gg"} className="plugin-icon"></img>
              Sign In with Google
            </div>
          )}
          buttonText="Login"
          onSuccess={responseGoogle}
          onFailure={responseGoogle}
          cookiePolicy={"single_host_origin"}
        />
        <div
          className="plugin-facebook"
          style={{
            marginLeft: "1rem",
          }}
        >
          <img src={icon_fb} alt={"icon-fb"} className="plugin-icon"></img>
        </div>
      </div>
    </Style>
  );
};

export default SignInPage;
