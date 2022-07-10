import { Button, Modal } from "antd";
import React from "react";
import Style from "./style";
import logo_text from "assets/images/logo_text.svg";
import { useNavigate } from "react-router";
interface PopupLoginProps {
  isOpen?: boolean;
  onClose?: () => void;
}
const PopupLogin = ({ isOpen = true, onClose }: PopupLoginProps) => {
  const navigate = useNavigate();
  return (
    <Modal
      title="Login to continue"
      visible={isOpen}
      onCancel={onClose}
      footer={[]}
    >
      <Style className="popup-login">
        <div className="logo">
          <img src={logo_text} alt="logo" />
        </div>
        <div className="description">
          We are a place where volunteers can connect with each other, helping
          disadvantaged people to improve their lives.
        </div>

        <div className="w-100 d-flex">
          <Button
            className="btn-login ml-auto mr-auto btn-primary"
            onClick={() => navigate("/auth/sign-in")}
          >
            Login
          </Button>
          <Button
            className="btn-login ml-auto mr-auto"
            onClick={() => navigate("/auth/sign-up")}
          >
            Create Account
          </Button>
        </div>
      </Style>
    </Modal>
  );
};

export default PopupLogin;
