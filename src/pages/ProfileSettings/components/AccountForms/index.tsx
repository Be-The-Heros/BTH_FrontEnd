import React from "react";
import { userState } from "@/states";
import { Typography } from "@mui/material";
import { useChangePassword } from "hooks/auth/changePassword/useChangePassword";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { NewCustomInput } from "../";
import {
  AccountEmailContainer,
  ChangePasswordButton,
  Container,
  DangerZoneContainer,
  DeleteAccountButton,
  SetNewPasswordContainer,
  Title,
} from "./style";

export interface AccountFormsProps {
  active: boolean;
}

const Error = styled.span`
  color: red;
  display: block;
`;

export interface ChangePasswordField {
  current_password: string;
  new_password: string;
  confirm_new_password: string;
}

const AccountForms = (props: AccountFormsProps) => {
  const { active } = props;
  const changePasswordMutation = useChangePassword();
  const user = useRecoilValue(userState);

  const {
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm<ChangePasswordField>();

  const onSubmit = (data: ChangePasswordField) => {
    changePasswordMutation.mutate({
      password: data.new_password,
      oldPassword: data.current_password,
    });
  };
  React.useEffect(() => {
    toast.dismiss();
    if (changePasswordMutation.isLoading) {
      toast.loading("Changing password...");
      return;
    }
    if (changePasswordMutation.isSuccess) {
      toast.success("Change password successfully");
      return;
    }
  }, [changePasswordMutation.isLoading, changePasswordMutation.isSuccess]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Container active={active}>
        <SetNewPasswordContainer>
          <Title variant="h4">Set new password</Title>
          <Controller
            name="current_password"
            control={control}
            rules={{ required: true }}
            defaultValue=""
            render={({ field }) => (
              <NewCustomInput
                field={field}
                className=""
                label="Current password"
                typeOfPassword
              />
            )}
          />
          {errors.current_password && <Error>Current password required</Error>}
          <Controller
            name="new_password"
            control={control}
            rules={{ required: true }}
            defaultValue=""
            render={({ field }) => (
              <NewCustomInput
                field={field}
                label="New Password"
                typeOfPassword
              />
            )}
          />
          {errors.new_password && <Error>New password required</Error>}
          <Controller
            name="confirm_new_password"
            control={control}
            rules={{ required: true }}
            defaultValue=""
            render={({ field }) => (
              <NewCustomInput
                field={field}
                label="Confirm new password"
                typeOfPassword
              />
            )}
          />
          {errors.confirm_new_password && (
            <Error>Confirm password required</Error>
          )}
          {watch("new_password") !== watch("confirm_new_password") && (
            <Error>Confirm password not matched</Error>
          )}
          <div className="set-new-password-btn-container">
            <ChangePasswordButton htmlType="submit">
              Set new password
            </ChangePasswordButton>
          </div>
        </SetNewPasswordContainer>

        <AccountEmailContainer>
          <Title variant="h4">Account email</Title>
          <div className="account-email-container__inform">
            <Typography
              variant="body1"
              style={{
                fontWeight: 700,
                color: "rgba(0, 0, 0, 0.6)",
                marginRight: 20,
              }}
            >
              Email
            </Typography>
            <Typography variant="body1" style={{ fontWeight: 300 }}>
              {user.email}
            </Typography>
          </div>
        </AccountEmailContainer>

        <DangerZoneContainer>
          <Title variant="h4" style={{ color: "rgba(255, 11, 11, 1)" }}>
            Danger Zone
          </Title>
          <Typography
            variant="body1"
            style={{ fontWeight: 700, marginBottom: 30 }}
          >
            Delete account
          </Typography>

          <Typography variant="body1">Deleting your account will: </Typography>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <span style={{ marginLeft: 10, marginRight: 15 }}>&#8226;</span>
            <Typography variant="body1">
              Delete any and all content you have, such as posts, comments, or
              your sharing posts.
            </Typography>
          </div>
          <DeleteAccountButton>Delete Account</DeleteAccountButton>
        </DangerZoneContainer>
      </Container>
    </form>
  );
};

export default AccountForms;
