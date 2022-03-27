import React from "react";
import styled from "styled-components";
import { Input } from "antd";
import { ControllerRenderProps } from "react-hook-form";
import { ChangePasswordField } from "../AccountForms";

interface NewsCustomInput {
  label?: string;
  placeholder?: string;
  className?: string;
  field?:
    | ControllerRenderProps<ChangePasswordField, "current_password">
    | ControllerRenderProps<ChangePasswordField, "new_password">
    | ControllerRenderProps<ChangePasswordField, "confirm_new_password">;
  typeOfPassword?: boolean;
}

const Container = styled.div`
  label {
    font-weight: 400;
    line-height: 33px;
    letter-spacing: 0em;
    margin-bottom: 3px;
  }

  input {
    border: 1px solid rgba(0, 0, 0, 0.4);
    border-radius: 10px;
  }
`;

const StyledPassword = styled(Input.Password)`
  input {
    border: 1px solid rgba(0, 0, 0, 0.4);
    border-radius: 10px;
    background-color: transparent;
    border-radius: 3px;
  }
`;

const NewCustomInput = (props: NewsCustomInput) => {
  const { label, placeholder, className, field, typeOfPassword } = props;
  return (
    <Container className={className}>
      <label>{label}</label>
      {typeOfPassword ? (
        <StyledPassword {...field} placeholder={placeholder} />
      ) : (
        <Input {...field} placeholder={placeholder} />
      )}
    </Container>
  );
};

export default NewCustomInput;