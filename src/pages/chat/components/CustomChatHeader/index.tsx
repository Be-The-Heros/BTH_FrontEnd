import { Avatar, Dropdown, Input, Menu, Modal } from "antd";
import React, { useEffect, useState } from "react";
import { FcInfo } from "react-icons/fc";
import { FiEdit3 } from "react-icons/fi";
import { AiFillPicture } from "react-icons/ai";
import { IoVideocam } from "react-icons/io5";
import { MdOutlineCall } from "react-icons/md";
import { CustomChatHeaderStyle } from "./style";
import { IGroupChat } from "recoil/roomChat";

interface ICustomChatHeader {
  infoGroupChat: IGroupChat | undefined;
  id_group: string;
}

export const CustomChatHeader = (props: ICustomChatHeader) => {
  const { infoGroupChat  } = props;
  const [avatar, setAvatar] = useState('');
 
  const [visibleEditName, setVisibleEditName] = useState(false);

  useEffect(() => {
    if (infoGroupChat) {
      setAvatar(infoGroupChat.avatar || infoGroupChat.firstMember?.avatar ||'');
    }
  }, [infoGroupChat])
  

  const showModalEditName = () => {
    setVisibleEditName(true);
  };

  const handleOkEditName = () => {
    setVisibleEditName(false);
  };

  const handleCancelEditName = () => {
    setVisibleEditName(false);
  };

  const reader = new FileReader();

  const dropdownSetting = (
    <Menu>
      <Menu.Item onClick={showModalEditName}>
        <FiEdit3 /> Edit Name
      </Menu.Item>
      <Menu.Item>
        <label style={{ cursor: "pointer" }}>
          <input
            accept="image/*"
            id="file-upload"
            style={{ display: "none" }}
            type="file"
            onChange={(e) => {
              var file = e?.target?.files?.item(0);

              reader.readAsDataURL(file as Blob);

              // Once loaded, do something with the string
              reader.addEventListener("load", () => {
                console.log(reader.result);
                var av = reader.result as string;
                setAvatar(av);
              });
            }}
          />
          <AiFillPicture /> Edit Img
        </label>
      </Menu.Item>
    </Menu>
  );

  return (
    <CustomChatHeaderStyle>
      <div className="header_message" style={{ display: "flex" }}>
        <div className="header_message_info" style={{ display: "flex" }}>
          <Avatar
            style={{
              margin: "0.5rem",
              background: "rgb(190 190 190 / 20%)",
            }}
            size={46}
            src={avatar}
          />
          <h3
            style={{
              color: "rgb(0 0 0)",
              textAlign: "center",
              margin: "auto 0",
            }}
          >
            {infoGroupChat?.name_group || infoGroupChat?.firstMember?.first_name+" "+infoGroupChat?.firstMember?.last_name}
          </h3>
        </div>
        <div
          style={{
            color: "blue",
            margin: "auto 2rem",
          }}
        >
          <MdOutlineCall
            size={25}
            style={{ marginRight: "1rem", cursor: "pointer" }}
          />
          <IoVideocam
            size={25}
            style={{ marginRight: "1rem", cursor: "pointer" }}
          />
          <Dropdown
            overlay={dropdownSetting}
            placement="bottomRight"
            trigger={["click"]}
          >
            <FcInfo size={25} style={{ cursor: "pointer" }} />
          </Dropdown>
        </div>
      </div>

      <Modal
        title="Edit name group"
        visible={visibleEditName}
        onOk={handleOkEditName}
        onCancel={handleCancelEditName}
      >
        <Input placeholder={infoGroupChat?.name_group || ""} />
      </Modal>
    </CustomChatHeaderStyle>
  );
};
