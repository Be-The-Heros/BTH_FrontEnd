import React from "react";
import Style from "./style";
import { LayoutApp } from "templates/LayoutApp";
import { AvatarCustom } from "components/Avatar";
import { useRecoilValue } from "recoil";
import { userState } from "recoil/users/state";
import { User, UsersContainer } from "./style";
import { Typography, CardHeader, Avatar } from "@mui/material";
import LocationIcon from "assets/icons/location.svg";
import {Button} from "antd";

export const Users = () => {
  const infoUser = useRecoilValue(userState);
  const full_name = infoUser.first_name + " " + infoUser.last_name;
  const [dataRender, setDataRender] = React.useState<UserInfo[]>([]);

  const renderOrganizationsList = () => {
    return Array(3)
      .fill(null)
      .map((item) => (
        <User>
          <CardHeader
            avatar={
              <AvatarCustom
                showPopover={true}
                size={64}
                bio="bio nè "
                fullName={full_name}
                uid={infoUser.uid}
                address="Ha Noi"
                srcAvatar={infoUser.avatar || ""}
              />
            }
            title={
              <Typography variant="body1" style={{ fontWeight: 600 }}>
                {full_name}
              </Typography>
            }
            subheader={
              <div className="user__location">
                <img
                  src={LocationIcon}
                  alt="location-icon"
                  className="user__location__icon"
                />
                <Typography className="user__location__address">
                  Ha Noi, Viet Nam
                </Typography>
              </div>
            }
          />
          <Typography variant="body1" className="follow__user">
            <Button>Follow</Button>
          </Typography>
        </User>
      ));
  };

  return (
    <UsersContainer>
      {renderOrganizationsList()}
      <div className="user-container__footer">
      <Button> See all</Button>
      </div>
    </UsersContainer>
  );
};
export default Users;
