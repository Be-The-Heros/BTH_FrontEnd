import { Button, Input, Modal } from "antd";
import { REGEX_EMAIL } from "constants/regex";
import { useChangeEmail } from "hooks/user/change-email/useChangeEmail";
import React from "react";
import { toast } from "react-toastify";
import { useRecoilState, useSetRecoilState } from "recoil";
import { userState } from "recoil/users/state";
import Style from "./style";
interface UpdateEmailProps {
  isOpen?: boolean;
  onClose: () => void;
}

export const PopupUpdateEmail = (props: UpdateEmailProps) => {
  const { isOpen, onClose } = props;
  const [user, setUser] = useRecoilState(userState);
  const mutation = useChangeEmail();
  const [emailValue, setEmail] = React.useState("");

  const handleChangEmail = () => {
    !mutation.isLoading && mutation.mutate(emailValue);
  };
  React.useEffect(() => {
    if (mutation.isSuccess && mutation.data) {
      setUser({
        ...user,
        email: mutation.data.email,
      });
      toast.success("Please check your email to verify your new email");
      onClose && onClose();
    }
  }, [mutation.data]);
  return (
    <Modal visible={isOpen} onCancel={onClose} footer={[]}>
      <Style className="popup-login">
        <div
          className="text-center"
          style={{
            fontSize: "1.5rem",
          }}
        >
          Change Email Address
        </div>
        <div className="description">
          <div className="input-group">
            <label className="w-100">Enter New Email:</label>
            <Input
              type="email"
              className="form-control"
              value={emailValue}
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
              style={{
                height: "2rem",
                marginTop: "0.25em",
                borderRadius: " 0.75em",
              }}
            />
          </div>
        </div>

        <div className="w-100 d-flex">
          <Button
            className="btn-login ml-auto mr-auto"
            onClick={() => handleChangEmail()}
            disabled={
              !emailValue || mutation.isLoading || !REGEX_EMAIL.test(emailValue)
            }
            type="primary"
          >
            {mutation.isLoading ? "loading" : "Continue"}
          </Button>
        </div>
      </Style>
    </Modal>
  );
};
