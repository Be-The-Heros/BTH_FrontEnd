import { UseChangePasswordByOtp, useChangePasswordByOtp } from "hooks/user";
import React, { useState, useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useSetRecoilState } from "recoil";
import { userState } from "recoil/users/state";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

const LENGTH_OTP = 6;
interface CheckingOTPProps {
  goBack: () => void;
  email: string;
}

interface InputsChangePassword {
  otp: number;
  password: string;
  confirmPassword: string;
}

export const CheckingOTP = (props: CheckingOTPProps) => {
  const { goBack } = props;
  const [countDownResendMail, setCountDownResendMail] = useState(60);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<InputsChangePassword>();
  const setLoginUser = useSetRecoilState(userState);
  const navigate = useNavigate();

  const useChangePassword = useChangePasswordByOtp();

  useEffect(() => {
    if (!useChangePassword.isError && useChangePassword.data) {
      console.log(useChangePassword.data);

      toast.success("Change password success");
      setLoginUser((state) => {
        return {
          ...state,
          isLoggedIn: true,
        };
      });
      navigate("/");
    } else {
      console.log(useChangePassword.error);
      toast.error("Otp is invalid");
    }
  }, [useChangePassword.data]);

  const onSubmit: SubmitHandler<InputsChangePassword> = (data) => {
    const dataForm: UseChangePasswordByOtp = {
      email: props.email,
      otp: data.otp,
      newPassword: data.password,
    };
    useChangePassword.mutate(dataForm);
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
          <label className="w-100">Enter comfirm password </label>
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
          Resend email {countDownResendMail}s
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
        >
          Change password
        </button>
      </div>
    </React.Fragment>
  );
};
