import { useResetPassword } from "hooks/auth/resetPassword/useRestPassword";
import { useGenerateOtp } from "hooks/otp/generate/useGenerateOtp";
import React, { useState } from "react";
import Countdown from "react-countdown";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

// const LENGTH_OTP = 6;
interface CheckingOTPProps {
  goBack: () => void;
  email: string;
}

interface InputsChangePassword {
  otp: number;
  password: string;
  confirmPassword: string;
}
const TIME_COUNT = 30;
export const FormResetPassword = (props: CheckingOTPProps) => {
  const { goBack, email } = props;
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<InputsChangePassword>();
  const navigate = useNavigate();
  const resetPassword = useResetPassword();
  const generateOtp = useGenerateOtp();
  const [resetCountDown, setResetCountdown] = useState(Date.now());

  const renderer = ({
    hours = 0,
    minutes = 0,
    seconds = 0,
    completed = false,
  }) => {
    if (completed) {
      // Render a completed state
      return (
        <div
          className="d-flex align-items-center"
          style={{ cursor: "pointer" }}
          onClick={() => {
            generateOtp.mutate(email);
            setResetCountdown(new Date().getTime());
          }}
        >
          Resend Email
        </div>
      );
    } else {
      // Render a countdown
      return (
        <div className="d-flex align-items-center">
          {`Send email in ${seconds} s`}
        </div>
      );
    }
  };
  React.useEffect(() => {
    if (resetPassword.isLoading) {
      toast.loading("Reset password...");
    }
    if (resetPassword.isSuccess) {
      toast.success("Reset password success");
      return navigate("/auth/sign-in");
    }
  }, [resetPassword.isSuccess]);
  const onSubmit: SubmitHandler<InputsChangePassword> = (data) => {
    resetPassword.mutate({
      newPassword: data.password,
      otp: data.otp,
    });
  };

  return (
    <React.Fragment>
      <div className="form-forgot-password__content col-12">
        <div className="form-forgot-password__content--form-input">
          <label className="w-100">Enter password</label>
          <input
            placeholder="Password"
            type="password"
            {...register("password", { required: true })}
          />
        </div>
        <div className="form-forgot-password__content--form-input">
          <label className="w-100">Enter confirm password </label>
          <input
            placeholder="Confirm Password"
            type="password"
            {...register("confirmPassword", {
              required: true,
              validate: (value) => {
                return value === watch("password") || "Passwords do not match";
              },
            })}
          />
          <div className="text-danger ">
            {errors.confirmPassword && errors.confirmPassword.message}
          </div>
        </div>
        <div className="form-forgot-password__content--form-input">
          <label className="w-100">Enter OTP value</label>
          <input
            placeholder="example: 567900"
            {...register("otp", { required: true })}
          />
        </div>
      </div>
      <div className="form-forgot-password__footer col-12 d-flex flex-wrap">
        <div className="form-forgot-password__footer-fg w-50">
          <Countdown
            renderer={renderer}
            key={resetCountDown}
            date={Date.now() + 1000 * TIME_COUNT}
          />
        </div>
        <div
          className="form-forgot-password__footer-fg w-50 text-right"
          onClick={() => goBack()}
        >
          Go Back?
        </div>
        <button
          className="btn btn--forgot-password w-100"
          onClick={handleSubmit(onSubmit)}
          disabled={Object.keys(errors).length > 0 || resetPassword.isLoading}
        >
          {resetPassword.isLoading ? "Loading..." : "Submit"}
        </button>
      </div>
    </React.Fragment>
  );
};
