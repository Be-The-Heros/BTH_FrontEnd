import { Avatar, Layout, Skeleton } from "antd";
import { useGetListGroupsChat } from "hooks/chat";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { groupChatState, IGroupChat } from "recoil/roomChat";

import { HeaderSide } from "./HeaderSide";
import Style from "./style";

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
      setActive(getFirstGroupChatId.id);
    }
  }, [listGroupChat]);

  const onChoose = (idGroup: string) => {
    
    setActive(idGroup);
    navigate("/chat/" + idGroup);
  };

  return (
    <Sider
      style={{ overflow: "auto", height: "100vh", background: "white", borderRight: '#02081017 solid 1px' }}
      width={350}
    >
      {isLoading ? (
        <>
          {[...Array(5)].map(() => (
            <Skeleton avatar paragraph={{ rows: 1 }} />
          ))}
        </>
      ) : (
        <><Style>
          <HeaderSide />
          
          {listGroupChat.map((e) => {
            return (
              <>
              <div style={{
                position:'relative',
              }}> 
              {e.type == 'group'? 
              <div className="avatar " 
                style={{
                  position: "absolute",
                  background:`${active == e.id ? "#eff7f8":'white'} `,
                  width:'65px',
                  padding: '1rem',
                  zIndex:'1',
                  top: '0',
                  left: '0',
                  bottom: '0',
                  borderBottom: '1px solid #e9eaea',
                }}
                >
                <div style={{position:'relative'}}>
                <Avatar
                  style={{
                    background: "rgb(190 190 190 / 20%)",
                    top: '0',
                    right: '-10px',
                    zIndex:'1',
                  }}
                  size={28}
                  src={e.firstMember?.avatar}
                />
                <Avatar
                  style={{
                    background: "rgb(190 190 190 / 20%)",
                    zIndex:'0',
                    bottom: '5px',
                    left: '0',
                  }}
                  size={28}
                  src={e.avatar}
                />
                </div>
                </div>
                : ''
              }
                
              
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
              </div>
              </>
            );
          })}
          </Style>
        </>
      )}
    </Sider>
  );
};
