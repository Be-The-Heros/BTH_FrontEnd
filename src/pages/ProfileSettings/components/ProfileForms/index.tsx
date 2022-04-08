import React from "react";
import styled from "styled-components";
import { Typography } from "@mui/material";
import { Button } from "antd";

import { NewCustomInput } from "../";
import { useRecoilValue } from "recoil";
import { userState } from "recoil/users/state";
import {
  Container,
  SaveProfileInformationButton,
  Title,
  UserInformContainer,
  WorkInformContainer,
} from "./style";
import { Controller, useForm } from "react-hook-form";
import { useEditUsersInform } from "hooks/profile/editUsersInform/useEditUsersInform";
import { toast } from "react-toastify";
import { useGetProfileInformByUID } from "hooks/profile/getProfileInform/useGetProfileInform";
import { ProfileInfo } from "hooks/profile/model";

export interface ProfileFormsProps {
  active: boolean;
  userInform?: ProfileInfo;
}

export interface PersonalInformField {
  first_name: string;
  last_name: string;
  city: string;
  address: string;
  bio: string;
}

const Error = styled.span`
  margin-top: -15px;
  margin-bottom: 10px;
  color: red;
  display: block;
`;

const ProfileForms = (props: ProfileFormsProps) => {
  const { active, userInform } = props;
  const editUsersInformMutation = useEditUsersInform();

  const user = useRecoilValue(userState);

  const {
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm<PersonalInformField>();

  const onSubmit = (data: PersonalInformField) => {
    // This is just used only for editing firstName and LastName of user
    const date = Date();

    editUsersInformMutation.mutate({
      ...data,
      middle_name: "",
      date_of_birth: date,
      phone: "",
    });
  };

  React.useEffect(() => {
    toast.dismiss();
    if (editUsersInformMutation.isLoading) {
      toast.loading("Updating user's information...");
      return;
    }
    if (editUsersInformMutation.isSuccess) {
      toast.success("Update user's information successfully");
      return;
    }
  }, [editUsersInformMutation.isLoading, editUsersInformMutation.data]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Container active={active}>
        <UserInformContainer>
          <Title variant="h4">User</Title>
          <Controller
            name="first_name"
            control={control}
            rules={{ required: true }}
            defaultValue={userInform?.first_name}
            render={({ field }) => (
              <NewCustomInput
                field={field}
                label="First name"
                placeholder="Ex: Trung"
                value={userInform?.first_name}
              />
            )}
          />
          {errors.first_name && <Error>First name required</Error>}
          <Controller
            name="last_name"
            control={control}
            rules={{ required: true }}
            defaultValue={userInform?.last_name}
            render={({ field }) => (
              <NewCustomInput
                field={field}
                label="Last name"
                placeholder="Ex: Jamin"
                value={userInform?.last_name}
              />
            )}
          />
          {errors.last_name && <Error>Last name required</Error>}

          <NewCustomInput
            label="Country"
            placeholder="Ex: Viet Nam"
            value={"Viet Nam"}
          />
          <Controller
            name="city"
            control={control}
            rules={{ required: true }}
            defaultValue={userInform?.city}
            render={({ field }) => (
              <NewCustomInput
                field={field}
                label="City"
                placeholder="Ex: Da Nang"
                value={userInform?.city}
              />
            )}
          />
          {errors.city && <Error>City required</Error>}

          <Controller
            name="address"
            control={control}
            rules={{ required: true }}
            defaultValue={userInform?.address}
            render={({ field }) => (
              <NewCustomInput
                field={field}
                label="Address"
                placeholder="Ex: K02/30 Nguyen The Loc"
                value={userInform?.address}
              />
            )}
          />
          {errors.address && <Error>Address required</Error>}

          <Controller
            name="bio"
            control={control}
            defaultValue={userInform?.bio}
            render={({ field }) => (
              <NewCustomInput
                field={field}
                label="Bio"
                placeholder="Ex: YOLO"
                value={userInform?.bio}
              />
            )}
          />
        </UserInformContainer>

        <WorkInformContainer>
          <Title variant="h4">Work</Title>
          <NewCustomInput label="Work" placeholder="Ex: Student" disabled />
          <NewCustomInput
            label="Education"
            placeholder="Ex: Student"
            disabled
          />
        </WorkInformContainer>

        <div className="save-profile-information">
          <SaveProfileInformationButton htmlType="submit">
            Save Profile Information
          </SaveProfileInformationButton>
        </div>
      </Container>
    </form>
  );
};

export default ProfileForms;
