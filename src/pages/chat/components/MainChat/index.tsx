import { Skeleton } from "antd";
import apis from "apis";
import { useGetListMessages, useSocket } from "hooks/chat";
import { API_CHAT } from "hooks/chat/configs";
import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useParams } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import { groupChatState, IGroupChat, IMessage } from "recoil/roomChat";
import { userState } from "recoil/users/state";
import { CustomMessage, IMessageRender } from "../ChatItem";
import { CustomChatHeader } from "../CustomChatHeader";
import { CustomeInputMessage } from "../CustomeInputMessage";

export const MainChat = () => {
  const { isError, socket } = useSocket();
  const { uid, avatar } = useRecoilValue(userState);
  const [groupChat, setGroupChatState] = useRecoilState(groupChatState);
  const { id } = useParams();
  const { listMessages, isLoading } = useGetListMessages(id);
  const [isMoreMess, setIsMoreMess] = useState(true);

  const [listMessagesRender, setListMessagesRender] = useState<
    IMessageRender[]
  >([]);

  const [infoGroupChat, setInfoGroupChat] = useState<IGroupChat | undefined>();

  useEffect(() => {
    if (id) {
      const listMessagesRenderTmp: IMessageRender[] = [];

      for (let index = 0; index < listMessages.length; index++) {
        const e = listMessages[index];
        const haveDown =
          listMessages[index + 1]?.uid === listMessages[index].uid;

        listMessagesRenderTmp.push({
          id: e.id,
          uid: e.uid,
          side: e.uid !== uid ? "left" : "right",
          content: e.contents,
          showAvatar: haveDown ? true : false,
          paddingBottom: haveDown ? "0px" : "10px",
          avatar: e.profiles?.avatar || "",
        });
      }
      setListMessagesRender(listMessagesRenderTmp);
    }
  }, [listMessages, id, uid]);

  useEffect(() => {
    console.log("isError socket ", isError, socket);
  }, [socket, isError]);

  useEffect(() => {
    if (groupChat.listGroup && id) {
      const item = {
        ...groupChat.listGroup.find((e) => e.id === id),
      } as IGroupChat;
      setInfoGroupChat(item);
    }
  }, [groupChat.listGroup, id]);

  useEffect(() => {
    if (listMessagesRender.length > 0 && id) {
    }
  }, [listMessagesRender, id]);

  const loadingMoreMess = () => {
    if (listMessages.length <= 0) {
      setIsMoreMess(false);
      return;
    }

    const getMoreMess = async () => {
      try {
        const { id } = infoGroupChat as IGroupChat;
        const lastId = listMessagesRender[listMessagesRender.length - 1].id;

        const data = await apis.get<IMessage[]>(
          API_CHAT,
          `/get-list-message?group_chat_id=${id}&&last_id=${lastId}`
        );

        console.log("loadingMoreMess", data);

        if (data.length) {
          setGroupChatState((state) => {
            const checkGroupChat = state.listGroupHaveMessages.findIndex(
              (e) => e.id_group === infoGroupChat?.id || ""
            );

            let newListMessage = [
              ...state.listGroupHaveMessages[checkGroupChat].messages,
              ...(data as IMessage[]),
            ];

            const newGroupChat = {
              id_group: infoGroupChat?.id || "",
              messages: [...newListMessage],
            };
            const newListGroupHaveMessages = [
              ...state.listGroupHaveMessages.map((e) => {
                if (e.id_group === infoGroupChat?.id) {
                  return newGroupChat;
                }
                return e;
              }),
            ];

            return {
              ...state,
              listGroupHaveMessages: newListGroupHaveMessages,
            };
          });

          if (data.length < 20) {
            setIsMoreMess(false);
          }
        } else {
          setIsMoreMess(false);
        }
      } catch (error) {
        console.log("loadingMoreMess", error);
      }
    };

    if (isMoreMess && listMessagesRender.length >= 20) {
      getMoreMess();
    }
  };

  //

  const onSendMessage = (message: string) => {
    if (socket && !isError && id) {
      socket.emit("client-send-message", {
        to_group: id,
        contents: message,
        uid: uid,
        type: "text",
        created_at: new Date().toISOString(),
        avatar,
        avatar_group: infoGroupChat?.avatar || "",
        name_group: infoGroupChat?.name_group || "",
      });
    }
  };

  const Loading = () => (
    <>
      {[...Array(5)].map((e, index) => (
        <Skeleton paragraph={{ rows: 2 }} />
      ))}
    </>
  );

  return (
    <div
      style={{
        maxHeight: "100vh",
        position: "relative",
        height: "100%",
        overflow: "hidden",
        minWidth: "30rem",
      }}
    >
      {!id && !isLoading ? (
        <Loading />
      ) : (
        <>
          <CustomChatHeader infoGroupChat={infoGroupChat} id_group={id || ""} />

          <div
            id="scrollableDiv"
            style={{
              maxHeight: "83%",
              overflowY: "auto",
              paddingLeft: "10px",
              paddingTop: "10px",
              overflow: "auto",
              display: "flex",
              flexDirection: "column-reverse",
            }}
          >
            <InfiniteScroll
              dataLength={listMessagesRender.length}
              next={loadingMoreMess}
              style={{ display: "flex", flexDirection: "column-reverse" }} //To put endMessage and loader to the top.
              inverse={true} //
              hasMore={isMoreMess}
              loader={<h4>...</h4>}
              scrollableTarget="scrollableDiv"
            >
              {listMessagesRender.map((e, index) => {
                return (
                  <CustomMessage
                    key={index}
                    uid={e.uid}
                    side={e.side}
                    content={e.content}
                    showAvatar={e.showAvatar}
                    paddingBottom={e.paddingBottom}
                    avatar={e.avatar}
                  />
                );
              })}
            </InfiniteScroll>
          </div>
          <CustomeInputMessage onSendMessage={onSendMessage} />
        </>
      )}
    </div>
  );
};
