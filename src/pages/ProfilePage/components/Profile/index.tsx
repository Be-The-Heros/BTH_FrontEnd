import React, { useState } from "react";
import { Typography, IconButton } from "@mui/material";
import styled from "styled-components";

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
import { useChangeAvatar } from "hooks/profile/ChangeAvatar/useChangeAvatar";
import { useChangeBackgroundPhoto } from "hooks/profile/ChangeBackgroundPhoto/useChangeBackgroundPhoto";
import Loading from "components/Loading";

interface ProfileProps {
  profileInfo: ProfileInfo;
}

interface OverlayProps {
  active: boolean;
}

const Overlay = styled.div<OverlayProps>`
  position: fixed;
  display: ${(props) => (props.active ? "block" : "none")};
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 2;
  cursor: pointer;
  text-align: center;
`;

const OverlayLoading = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
`;

const Profile = (props: ProfileProps) => {
  const changeAvatarMutation = useChangeAvatar();
  const changeBackgroundPhotoMutation = useChangeBackgroundPhoto();

  const { profileInfo } = props;
  const full_name = profileInfo.first_name + " " + profileInfo.last_name;

  // Get the instance of the FileReader
  const reader = new FileReader();

  const [selectedAvatarImage, setSelectedAvatarImage] = useState<
    string | ArrayBuffer | null | undefined
  >();
  const [selectedAvatarImageFile, setSelectedAvatarImageFile] =
    useState<File>();

  const [selectedBackgroundImage, setSelectedBackgroundImage] = useState<
    string | ArrayBuffer | null | undefined
  >();
  const [selectedBackgroundImageFile, setSelectedBackgroundImageFile] =
    useState<File>();

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

    reader.readAsDataURL(file as Blob);
    setSelectedAvatarImageFile(file!);

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

    reader.readAsDataURL(file as Blob);
    setSelectedBackgroundImageFile(file!);

    // Once loaded, do something with the string
    reader.addEventListener("load", (event) => {
      setChangingState((state) => true);
      console.log(event.target?.result);

      setSelectedBackgroundImage(event.target?.result);
    });
  };

  const onSaveChanges = () => {
    if (selectedAvatarImageFile) {
      changeAvatarMutation.mutate(selectedAvatarImageFile!);
    }
    if (selectedBackgroundImageFile) {
      changeBackgroundPhotoMutation.mutate(selectedBackgroundImageFile!);
    }
    setChangingState((state) => false);
  };

  return (
    <>
      <Overlay
        active={
          changeAvatarMutation.isLoading ||
          changeBackgroundPhotoMutation.isLoading
        }
      >
        <OverlayLoading>
          <Loading />
        </OverlayLoading>
      </Overlay>
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
            accept="image/*"
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
                accept="image/*"
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
        {changingState && (
          <SaveChangesButton onClick={onSaveChanges}>
            Save Changes
          </SaveChangesButton>
        )}
        <EditProfileButton>Edit Profile</EditProfileButton>
      </Container>
    </>
  );
};

export default Profile;
