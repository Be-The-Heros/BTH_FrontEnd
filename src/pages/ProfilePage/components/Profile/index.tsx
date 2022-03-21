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

const Profile = () => {
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
              <img src="https://i.pinimg.com/originals/4d/e9/eb/4de9eba8c7266fc0e728c929790ba9ed.jpg" />
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
          <UserName variant="h5">Trung Jamin</UserName>
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
