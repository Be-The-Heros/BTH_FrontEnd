import React from "react";
import { Typography, IconButton } from "@mui/material";

import {
  Container,
  EditCoverPhotoButton,
  AvatarContainer,
  UserAvatar,
  UserName,
  EditProfileButton,
} from "./style";
import AddressIcon from "assets/icons/address.svg";
import CalendarIcon from "assets/icons/calendar.svg";
import CameraIcon from "assets/icons/camera.svg";
import { ProfileInfo } from "hooks/profile/model";

interface ProfileProps {
  profileInfo: ProfileInfo;
}

const Profile = (props: ProfileProps) => {
  const { profileInfo } = props;
  const full_name = profileInfo.first_name + " " + profileInfo.last_name;

  console.log(profileInfo);

  return (
    <Container>
      <img
        className="background-img"
        src="https://www.akamai.com/site/im-demo/perceptual-standard.jpg?imbypass=true"
        alt="background-image"
      />
      <EditCoverPhotoButton>Edit Cover Photo</EditCoverPhotoButton>
      <AvatarContainer>
        <div className="user-avatar">
          <UserAvatar
            shape="circle"
            size="large"
            src={
              <img
                src={
                  profileInfo.avatar
                    ? profileInfo.avatar
                    : "https://thelifetank.com/wp-content/uploads/2018/08/avatar-default-icon.png"
                }
              />
            }
          />
          <IconButton className="user-avatar__camera">
            <img
              src={CameraIcon}
              alt="camera-icon"
              style={{
                width: 25,
                height: 25,
                color: "#fff",
              }}
            />
          </IconButton>
        </div>
        <div className="user-inform">
          <UserName variant="h5">{full_name}</UserName>
          <div className="user-inform__address">
            <div className="user-inform__address__detail">
              <img
                src={AddressIcon}
                alt="address-icon"
                style={{ width: 20, height: 20, marginRight: 10 }}
              />
              <Typography variant="body1">Da Nang, Viet Nam, </Typography>
            </div>
            <div className="user-inform__address__detail">
              <img
                src={CalendarIcon}
                alt="address-icon"
                style={{ width: 25, height: 25, marginRight: 10 }}
              />
              <Typography variant="body1">Joined January 2020</Typography>
            </div>
          </div>
        </div>
      </AvatarContainer>
      <EditProfileButton>Edit Profile</EditProfileButton>
    </Container>
  );
};

export default Profile;
