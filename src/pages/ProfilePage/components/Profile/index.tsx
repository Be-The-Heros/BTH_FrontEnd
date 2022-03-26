import React, { useState } from "react";
import { Typography, IconButton } from "@mui/material";

import {
  Container,
  EditCoverPhotoButton,
  AvatarContainer,
  UserAvatar,
  UserName,
  EditProfileButton,
  SaveChangesButton,
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

  // Get the instance of the FileReader
  const reader = new FileReader();

  const [selectedAvatarImage, setSelectedAvatarImage] = useState<
    string | ArrayBuffer | null | undefined
  >();

  const [selectedBackgroundImage, setSelectedBackgroundImage] = useState<
    string | ArrayBuffer | null | undefined
  >();

  const avatarInputFile = React.useRef<HTMLInputElement | null>(null);
  const backgroundInputFile = React.useRef<HTMLInputElement | null>(null);

  const [changingState, setChangingState] = useState(false);

  const onAvatarButtonClick = () => {
    // `current` points to the mounted file input element
    avatarInputFile?.current?.click();
  };

  const onEditBackgroundButtonClick = () => {
    backgroundInputFile?.current?.click();
  };

  const onChangeAvatarFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.stopPropagation();
    event.preventDefault();
    var file = event?.target?.files?.item(0);
    console.log(file);
    // setSelectedAvatarImage(file) /// if you want to upload latter
    reader.readAsDataURL(file as Blob);

    // Once loaded, do something with the string
    reader.addEventListener("load", (event) => {
      setChangingState((state) => true);
      setSelectedAvatarImage(event.target?.result);
    });
  };

  const onChangeBackgroundFile = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    event.stopPropagation();
    event.preventDefault();
    var file = event?.target?.files?.item(0);

    // setSelectedAvatarImage(file) /// if you want to upload latter
    reader.readAsDataURL(file as Blob);

    // Once loaded, do something with the string
    reader.addEventListener("load", (event) => {
      setChangingState((state) => true);
      setSelectedBackgroundImage(event.target?.result);
    });
  };

  return (
    <Container>
      <img
        className="background-img"
        src={
          selectedBackgroundImage
            ? (selectedBackgroundImage as string)
            : profileInfo.cover_image
            ? profileInfo.cover_image
            : "https://www.akamai.com/site/im-demo/perceptual-standard.jpg?imbypass=true"
        }
        alt="background-image"
      />
      <EditCoverPhotoButton onClick={onEditBackgroundButtonClick}>
        <input
          type="file"
          id="file-1"
          ref={backgroundInputFile}
          style={{ display: "none" }}
          onChange={onChangeBackgroundFile}
        />
        Edit Cover Photo
      </EditCoverPhotoButton>
      <AvatarContainer>
        <div className="user-avatar">
          <UserAvatar
            shape="circle"
            size="large"
            src={
              <img
                src={
                  selectedAvatarImage
                    ? (selectedAvatarImage as string)
                    : profileInfo.avatar
                    ? profileInfo.avatar
                    : "https://thelifetank.com/wp-content/uploads/2018/08/avatar-default-icon.png"
                }
              />
            }
          />
          <IconButton
            className="user-avatar__camera"
            onClick={onAvatarButtonClick}
          >
            <input
              type="file"
              id="file"
              ref={avatarInputFile}
              style={{ display: "none" }}
              onChange={onChangeAvatarFile}
            />
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
      {changingState && <SaveChangesButton>Save Changes</SaveChangesButton>}
      <EditProfileButton>Edit Profile</EditProfileButton>
    </Container>
  );
};

export default Profile;
