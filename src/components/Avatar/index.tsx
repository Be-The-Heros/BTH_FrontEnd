import { Popover, Avatar, Row, Col, Typography, Button } from "antd";
import React from "react";
import { BiHomeCircle } from "react-icons/bi";
import { FcApproval } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { userState } from "recoil/users/state";

const { Title } = Typography;

enum SizeImg {
  small = 32,
  medium = 46,
  large = 64,
}

export interface AvatarCustomProps {
  srcAvatar: string;
  uid: string;
  fullName: string;
  bio?: string;
  address?: string;
  size?: 64 | 32 | 46;
  showPopover: boolean;
  isVerified: boolean;
}
export const AvatarCustom = (props: AvatarCustomProps) => {
  const {
    srcAvatar,
    uid,
    size,
    fullName,
    bio,
    address,
    showPopover,
    isVerified,
  } = props;
  const navigate = useNavigate();
  console.log("uid", uid, isVerified);
  const content = (
    <div style={{ minWidth: "300px", maxWidth: "300px" }}>
      <Row justify="start" wrap={false}>
        <Col style={{ paddingRight: "10px" }}>
          <Avatar size={70} src={srcAvatar} alt="Avatar" />
        </Col>
        <Col>
          <Title
            level={4}
            style={{
              fontWeight: "bold",
            }}
          >
            {fullName}
            {isVerified && <FcApproval />}
          </Title>

          {bio && <div style={{ padding: "5px 0" }}>{bio}</div>}

          {/* address */}
          {address && (
            <div style={{ padding: "5px 0" }}>
              <BiHomeCircle size={18} /> {address}
            </div>
          )}
        </Col>
      </Row>

      <Row justify="start" wrap={false} style={{ paddingTop: "10px" }}>
        <Col flex={4} style={{ padding: "0 5px" }}>
          <Button type="default" size={"small"} block>
            flow
          </Button>
        </Col>

        <Col flex={2} style={{ padding: "0 5px" }}>
          <Button type="default" size={"small"} block>
            ...
          </Button>
        </Col>
      </Row>
    </div>
  );
  return (
    <div className="avatar" onClick={() => navigate(`/profile/${uid}`)}>
      {showPopover ? (
        <Popover content={content}>
          <Avatar size={size || 64} src={srcAvatar} alt="Avatar" />
        </Popover>
      ) : (
        <Avatar size={size || 64} src={srcAvatar} alt="Avatar" />
      )}
    </div>
  );
};
