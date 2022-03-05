import icon_fb from "assets/images/icon_fb.svg";
import icon_gg from "assets/images/icon_gg.svg";
import { isEmptyValue } from "helpers";
import { useRequestForgotPassword } from "hooks/user";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { CheckingOTP } from "./components/CheckingOTP";
import Style from "./style";
import { toast } from "react-toastify";
export default function ForgotPasswordPage() {
  const navigate = useNavigate();
  const [emailValue, setEmailValue] = useState("");
  const [isOpenOTP, setIsOpenOTP] = useState(false);

  const useRequestOtp = useRequestForgotPassword();

  useEffect(() => {
    if (!useRequestOtp.isError && useRequestOtp.data) {
      setIsOpenOTP(true);
      toast.error("let's check your email");
      console.log("useRequestOtp.data", useRequestOtp.data);
    } else {
      toast.error("your email is invalid");
      console.log(useRequestOtp.error);
    }
  }, [useRequestOtp.data]);

  const sendOtp = () => {
    useRequestOtp.mutate(emailValue);
  };

  const renderInputEmail = () => {
    return (
      <React.Fragment>
        <div className="form-forgot-password__content col-12">
          <div className="form-forgot-password__content--form-input">
            <label className="w-100">Enter email address</label>
            <input
              type="text"
              placeholder="example@example"
              value={emailValue}
              onChange={(e) => setEmailValue(e.target.value)}
            />
          </div>
        </div>

        <div className="form-forgot-password__footer col-12">
          <div
            className="form-forgot-password__footer-fg text-right"
            onClick={() => navigate("/auth/sign-in")}
          >
            Go to Sign In?
          </div>
          <button
            className="btn btn--forgot-password w-100"
            disabled={isEmptyValue(emailValue)}
            onClick={sendOtp}
          >
            Send OTP
          </button>
        </div>
      </React.Fragment>
    );
  };
  return (
    <Style>
      <div className="form-forgot-password">
        <div className="form-forgot-password__header d-flex flex-wrap">
          <div className="col-6">
            <div className="form-forgot-password__header--welcome">
              Welcome to <span>Be The Heroes</span>
            </div>
            <div className="form-forgot-password__header--type">
              {`${isOpenOTP ? "Change password" : "Forgot Password"}`}
            </div>
          </div>
          <div className="col-6">
            <div className="form-forgot-password__header--sign-up text-right">
              Don't have an account?
            </div>
            <div
              className="form-forgot-password__header--sign-up-link text-right"
              onClick={() => navigate("/auth/sign-up")}
            >
              Sign up
            </div>
          </div>
        </div>
        {isOpenOTP ? (
          <CheckingOTP goBack={() => setIsOpenOTP(false)} email={emailValue} />
        ) : (
          renderInputEmail()
        )}
      </div>
      <div className="plugin w-100 d-flex flex-wrap justify-content-center">
        <div className="plugin-google">
          <img src={icon_gg} alt={"icon-gg"} className="plugin-icon"></img>
          Sign In with Google
        </div>
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
}
