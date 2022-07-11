import icon_fb from "assets/images/icon_fb.svg";
import icon_gg from "assets/images/icon_gg.svg";
import { REGEX_EMAIL } from "constants/regex";
import { useGenerateOtp } from "@/hooks/otp/useGenerateOtp";
import React, { useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { FormCheckEmail } from "./components/FormCheckEmail";
import { FormResetPassword } from "./components/FormResetPassword";
import Style from "./style";

export default function ForgotPasswordPage() {
  const navigate = useNavigate();
  const generateOtp = useGenerateOtp();
  const [isOpenFormRest, setIsFormReset] = useState(false);
  const [emailValue, setEmail] = useState("");

  React.useEffect(() => {
    toast.dismiss();
    if (generateOtp.isLoading) {
      toast.loading("Checking Your Email ...");
      return;
    }
    if (generateOtp.isSuccess) {
      toast.success("Please check OTP in your email address...");
      setIsFormReset(true);
      return;
    }
  }, [generateOtp.isLoading, generateOtp.isSuccess]);
  return (
    <Style>
      <div className="form-forgot-password">
        <div className="form-forgot-password__header d-flex flex-wrap">
          <div className="col-6">
            <div className="form-forgot-password__header--welcome">
              Welcome to <span>Be The Heroes</span>
            </div>
            <div className="form-forgot-password__header--type">
              {`${isOpenFormRest ? "Reset Password" : "Confirm Your Email"}`}
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
        {isOpenFormRest ? (
          <FormResetPassword
            goBack={() => setIsFormReset(false)}
            email={emailValue}
          />
        ) : (
          <FormCheckEmail
            sendOtp={() => generateOtp.mutate(emailValue)}
            setEmail={setEmail}
            btnDisabled={!REGEX_EMAIL.test(emailValue) || generateOtp.isLoading}
          />
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
