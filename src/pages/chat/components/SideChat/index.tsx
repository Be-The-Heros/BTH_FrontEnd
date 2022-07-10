import { Layout, Skeleton } from "antd";
import { useGetListGroupsChat } from "hooks/chat";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { groupChatState, IGroupChat } from "@/states/roomChat";
import { CustomeAvatar } from "./CustomAvatar";
import { HeaderSide } from "./HeaderSide";
import Style from "./style";

const { Sider } = Layout;
const { ChatItem } = require("react-chat-elements");

export const SideChat = () => {
  const navigate = useNavigate();

  const { isLoading } = useGetListGroupsChat();
  const groupChat = useRecoilValue(groupChatState);
  const [listGroupChat, setListGroupChat] = useState<IGroupChat[]>([]);
  const [active, setActive] = useState<string>("");
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
      style={{
        overflow: "auto",
        height: "100vh",
        background: "white",
        borderRight: "#02081017 solid 1px",
      }}
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
          <Style>
            <HeaderSide />

            {listGroupChat.map((e) => {
              const nameGroup =
                e.type === "group"
                  ? e.name_group
                  : e.firstMember?.first_name + " " + e.firstMember?.last_name;

              return (
                <>
                  <div
                    style={{
                      position: "relative",
                    }}
                  >
                    {e.type === "group" && !e.avatar && (
                      <CustomeAvatar active={active} infoGroup={e} />
                    )}

                    <ChatItem
                      className={active === e.id ? "chatItem" : ""}
                      avatar={e.avatar || e.firstMember?.avatar}
                      title={nameGroup}
                      subtitle={e.lastMessage?.contents || ""}
                      date={new Date(e.lastMessage?.created_at || "")}
                      key={e.id}
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
