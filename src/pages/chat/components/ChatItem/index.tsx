import { Avatar, Comment, Row } from "antd";
export interface IMessageRender {
  id?: string;
  uid: string;
  side: "left" | "right";
  content: string;
  showAvatar?: boolean;
  paddingBottom?: string;
  avatar?: string;
}
export const CustomMessage = (props: IMessageRender) => {
  const { side, content, showAvatar, paddingBottom, avatar } = props;
  const classComment = side === "left" ? "" : "custom-right-message";
  const justify = side === "left" ? "start" : "end";
  const showAvatarValue = !showAvatar ? "unset" : "hidden";

  return (
    <Comment
      className={classComment}
      // style={{ paddingBottom: paddingBottom }}
      avatar={
        <>
          <Avatar
            style={{
              visibility: showAvatarValue,
            }}
            src={avatar}
          />
        </>
      }
      content={
        <Row justify={justify}>
          <p
            style={{
              background: "#e4e6eb",
              color: "black",
              padding: "3px 10px",
              borderRadius: "15px",
              textAlign: side,
              marginRight: "5px",
              maxWidth: "70%",
            }}
          >
            {content}
          </p>
        </Row>
      }
    />
  );
};
