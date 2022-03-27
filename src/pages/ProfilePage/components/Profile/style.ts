import { Typography } from "@mui/material";
import { Button, Avatar } from "antd";
import styled from "styled-components";

export const Container = styled.div`
  position: relative;
  width: 100%;
  height: 550px;
  border-radius: 10px;

  .background-img {
    position: absolute;
    width: 100%;
    height: 80%;
    object-fit: fill;
    border-radius: 10px 10px 0 0;
  }
`;

export const EditCoverPhotoButton = styled(Button)`
  position: absolute;
  bottom: 130px;
  right: 30px;
  height: 50px;
  border-radius: 10px;
  background-color: #fff;
`;

export const AvatarContainer = styled.div`
  position: absolute;
  bottom: 40px;
  left: 30px;
  display: flex;
  flex-direction: row;

  .user-avatar {
    position: relative;

    &__camera {
      position: absolute;
      bottom: -4px;
      right: -11px;
    }
  }

  .user-inform {
    display: flex;
    flex-direction: column;
    margin-left: 15px;
    margin-top: 35px;

    &__address {
      margin-top: 10px;
      display: flex;
      flex-direction: row;
      justify-content: space-between;

      &__detail {
        display: flex;
        flex-direction: row;
        margin-right: 15px;
      }
    }
  }
`;
export const UserAvatar = styled(Avatar)`
  border: 1px solid black;
  width: 100px;
  height: 100px;
`;
export const UserName = styled(Typography)`
  font-family: Roboto;
  font-size: 36px;
  font-weight: bold;
  color: rgba(0, 0, 0, 0.8);
`;

export const EditProfileButton = styled(Button)`
  position: absolute;
  bottom: 40px;
  right: 30px;
  height: 50px;
  width: 155px;
  border-radius: 10px;
  background-color: rgba(124, 223, 255, 1);
  line-height: 28px;
  color: #000;
`;

export const SaveChangesButton = styled(Button)`
  position: absolute;
  bottom: 40px;
  right: 200px;
  height: 50px;
  width: 155px;
  border-radius: 10px;
  background-color: rgba(124, 223, 255, 1);
  line-height: 28px;
  color: #000;
`;
