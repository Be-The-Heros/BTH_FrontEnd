import { Layout, Skeleton } from "antd";
import { useGetListGroupsChat } from "hooks/chat";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { groupChatState, IGroupChat } from "recoil/roomChat";

import { HeaderSide } from "./HeaderSide";

const { Sider } = Layout;
const { ChatItem } = require("react-chat-elements");

export const SideChat = () => {
  const navigate = useNavigate();

  const { isLoading } = useGetListGroupsChat();
  const groupChat = useRecoilValue(groupChatState);
  const [listGroupChat, setListGroupChat] = useState<IGroupChat[]>([]);
  const [active, setActive] = useState<String>("");
  useEffect(() => {
    groupChat.listGroup && setListGroupChat(groupChat.listGroup);
  }, [groupChat.listGroup]);

  useEffect(() => {
    const getFirstGroupChatId = listGroupChat[0];
    if (getFirstGroupChatId) {
      navigate("/chat/" + getFirstGroupChatId.id);
    }
  }, [listGroupChat]);

  const onChoose = (idGroup: string) => {
    setActive(idGroup);
    navigate("/chat/" + idGroup);
  };

  return (
    <Sider
      style={{ overflow: "auto", height: "100vh", background: "white" }}
      width={350}
    >
      {isLoading ? (
        <>
          {[...Array(5)].map(() => (
            <Skeleton avatar paragraph={{ rows: 1 }} />
          ))}
        </>
      ) : (
        <>
          <HeaderSide />
          {listGroupChat.map((e) => {
            return (
              <ChatItem
                className={active == e.id ? "chatItem" : ""}
                avatar={e.avatar || e.firstMember?.avatar}
                title={
                  e.name_group ||
                  e.firstMember?.first_name + " " + e.firstMember?.last_name
                }
                subtitle={e.lastMessage?.contents || ""}
                date={
                  e.lastMessage?.created_at
                    ? new Date(e.lastMessage?.created_at)
                    : ""
                }
                key={Math.random()}
                onClick={() => onChoose(e.id)}
              />
            );
          })}
        </>
      )}
    </Sider>
  );
};
