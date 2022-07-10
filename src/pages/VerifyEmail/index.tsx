import { Button, Input } from "antd";
import Loading from "components/Loading";
import { PopupUpdateEmail } from "components/UpdateEmail";
import { useGenerateOtp } from "hooks/otp/generate/useGenerateOtp";
import { useVerifyEmail } from "hooks/user/verify-email/useVerifyEmail";
import React from "react";
import Countdown from "react-countdown";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { useRecoilState } from "recoil";
import { userState } from "@/states";

const TIME_COUNT = 30;

export const VerifyEmailPage = () => {
  const [user, setUser] = useRecoilState(userState);
  const generateOtp = useGenerateOtp();
  const verifyMutation = useVerifyEmail();
  const navigate = useNavigate();
  const [otpValue, setOtpValue] = React.useState("");
  const [openPopup, setOpenPopup] = React.useState(false);
  const [keyReset, setResetCountdown] = React.useState(0);
  const [timeCount, setTimeCountdown] = React.useState(Date.now());
  const toastId = React.useRef<any>(null);

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
            generateOtp.mutate(user.email);
            setResetCountdown(new Date().getTime());
            setTimeCountdown(Date.now());
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

  const handleCheckOTP = () => {
    verifyMutation.mutate(otpValue);
  };
  React.useEffect(() => {
    generateOtp.mutate(user.email);
  }, []);

  React.useEffect(() => {
    if (generateOtp.data) {
      setResetCountdown(new Date().getTime());
    }
  }, [generateOtp.data]);
  React.useEffect(() => {
    if (verifyMutation.isLoading) {
      toastId.current = toast.loading("Checking OTP...");
    } else {
      toast.dismiss(toastId.current || "");
    }
  }, [verifyMutation.isLoading]);

  React.useEffect(() => {
    if (verifyMutation.isSuccess) {
      toast.success("Email verified");
      setUser({ ...user, level: 2 });
      navigate("/");
      return;
    }
    verifyMutation.isError && setOtpValue("");
  }, [verifyMutation.isSuccess]);

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{
        padding: "5rem 0",
      }}
    >
      <PopupUpdateEmail
        isOpen={openPopup}
        onClose={() => setOpenPopup(false)}
      />
      <div
        className="form-verify-email"
        style={{
          boxShadow: "0 1px 2px rgb(0 0 0 / 10%), 0 2px 4px rgb(0 0 0 / 10%)",
          borderRadius: "8px",
          minWidth: "500px",
          backgroundColor: "#fff",
          //   padding: '2% 1.5%',
        }}
      >
        <div
          className="form-header"
          style={{
            borderBottom: "1px solid rgba(0, 0, 0, .1)",
            fontSize: "1.75rem",
            fontWeight: "bold",
          }}
        >
          <h2
            style={{
              margin: "0",
              padding: "1rem 0.75rem",
            }}
          >
            Enter Code OTP
          </h2>
        </div>

        {!generateOtp.isLoading ? (
          <React.Fragment>
            {" "}
            <div
              className="form-content"
              style={{
                padding: "1rem 0.75rem",
                borderBottom: "1px solid rgba(0, 0, 0, .1)",
              }}
            >
              Please check code in your email address. OTP have 6 number.
              <div
                className="form-input d-flex"
                style={{
                  marginTop: "1rem",
                }}
              >
                <div className="w-50">
                  <Input
                    placeholder="Enter OTP Code"
                    value={otpValue}
                    typeof="number"
                    type="number"
                    maxLength={6}
                    onChange={(e) => setOtpValue(e.target.value)}
                  />
                </div>
                <div className="col-6 d-flex align-items-center">
                  <p>
                    We sent you email address:{" "}
                    <span
                      style={{
                        color: "var(--dark)",
                      }}
                    >
                      {user.email}
                    </span>
                  </p>
                </div>
              </div>
            </div>
            <div
              className="form-footer d-flex justify-content-between"
              style={{
                padding: "0.5rem  0.75rem",
                borderBottom: "1px solid rgba(0, 0, 0, .1)",
              }}
            >
              <Countdown
                renderer={renderer}
                key={keyReset}
                date={timeCount + 1000 * TIME_COUNT}
              />
              <div className="w-60 d-flex justify-content-around">
                <Button
                  className="btn-continue"
                  onClick={() => setOpenPopup(true)}
                >
                  Change email
                </Button>

                <Button
                  type="primary"
                  disabled={otpValue.trim().length !== 6}
                  className="btn-continue"
                  onClick={() => handleCheckOTP()}
                >
                  Continue
                </Button>
              </div>
            </div>
          </React.Fragment>
        ) : (
          <div
            className="d-flex"
            style={{
              height: "300px",
            }}
          >
            <Loading cover="content" />
          </div>
        )}
      </div>
    </div>
  );
};
