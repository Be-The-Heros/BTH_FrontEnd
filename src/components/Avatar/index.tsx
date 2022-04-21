import { Popover, Avatar, Row, Col, Typography, Button } from "antd";
import React from "react";
import { BiHomeCircle } from "react-icons/bi";
import { Link } from "react-router-dom";

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
}
export const AvatarCustom = (props: AvatarCustomProps) => {
  const { srcAvatar, uid, size, fullName, bio, address, showPopover } = props;

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
            follow
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
    <div>
      {showPopover ? (
        <Popover content={content}>
          <Link to={`/profile/${uid}`}>
            <Avatar size={size || 64} src={srcAvatar} alt="Avatar" />
          </Link>
        </Popover>
      ) : (
        <Link to={`/profile/${uid}`}>
          <Avatar size={size || 64} src={srcAvatar} alt="Avatar" />
        </Link>
      )}
    </div>
  );
};
