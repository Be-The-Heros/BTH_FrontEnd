import { SideChat } from "./components/SideChat";
import { LayoutCustom } from "./layout";
import { Layout } from "antd";
import { MainChat } from "./components/MainChat";
import { useSocket, useSocketHandle } from "hooks/chat";
import "react-chat-elements/dist/main.css";

const { Content } = Layout;

export const ChatsPage = () => {
  const { socket } = useSocket();
  useSocketHandle(socket);

  const BodyRender = () => {
    return (
      <Content>
        <MainChat />
      </Content>
    );
  };
  return <LayoutCustom sidebar={SideChat()}>{BodyRender()}</LayoutCustom>;
};
