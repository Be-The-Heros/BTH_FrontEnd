import { Avatar } from "antd";
import React from "react";
import { useRecoilValue } from "recoil";
import { IGroupChat } from "recoil/roomChat";
import { userState } from "recoil/users/state";

interface ICustomeAvatar {
  infoGroup: IGroupChat;
  active: string;
}

export const CustomeAvatar = (props: ICustomeAvatar) => {
  // if have avatar group -> take avatar
  // else take avatar user + avatar other user => avatar group

  const { infoGroup, active } = props;
  const { avatar } = useRecoilValue(userState);

  console.log(infoGroup.firstMember?.avatar || "", avatar);

  return (
    <>
      <div
        className="avatar "
        style={{
          position: "absolute",
          background: `${active === infoGroup.id ? "#eff7f8" : "white"} `,
          width: "65px",
          padding: "1rem",
          zIndex: "1",
          top: "0",
          left: "0",
          bottom: "0",
          borderBottom: "1px solid #e9eaea",
        }}
      >
        <div style={{ position: "relative" }}>
          <Avatar
            style={{
              background: "rgb(190 190 190 / 20%)",
              top: "0",
              right: "-10px",
              zIndex: "1",
            }}
            size={28}
            src={infoGroup.firstMember?.avatar || ""}
          />
          <Avatar
            style={{
              background: "rgb(190 190 190 / 20%)",
              zIndex: "0",
              bottom: "5px",
              left: "0",
            }}
            size={28}
            src={avatar}
          />
        </div>
      </div>
    </>
  );
};
