import { getLocalStorage } from "helpers/setTitleDocument";
import { useEffect, useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { groupChatState, IMessage } from "recoil/roomChat";
import { userState } from "recoil/users/state";
import { io, Socket } from "socket.io-client";
import { urlSocket } from "./configs";

export interface IMessageFromSocket {
  uid: string;
  to_group: string;
  type: "text" | "img" | "file";
  contents: string;
  created_at: Date;
  updated_at?: Date;
  avatar: string;
  avatar_group: string;
  name_group: string;
}

export const useSocketHandle = (socket: Socket | undefined): void => {
  const { uid } = useRecoilValue(userState);
  const setGroupChatState = useSetRecoilState(groupChatState);

  useEffect(() => {
    if (socket) {
      socket.on(uid, (data: IMessageFromSocket) => {

        const { to_group, avatar_group, name_group } = data;

        setGroupChatState((state) => {
          const checkGroupChat = state.listGroupHaveMessages.findIndex(
            (e) => e.id_group === to_group
          );

          if (checkGroupChat === -1) {
            let newlistGroup = [...state.listGroup];

            newlistGroup = newlistGroup.filter((e) => e.id !== to_group);
            newlistGroup.unshift({
              id: to_group,
              name_group: name_group,
              avatar: avatar_group,
            });

            const newMessage: IMessage = {
              uid: data.uid,
              contents: data.contents,
              created_at: data.created_at,
              type: data.type,
              to_group: data.to_group,
              profiles: {
                avatar: data.avatar,
                first_name: "",
                last_name: "",
              },
            };

            const newListGroupHaveMessages = [
              ...state.listGroupHaveMessages,
              {
                id_group: to_group,
                messages: [newMessage],
              },
            ];
            return {
              ...state,
              listGroup: newlistGroup,
              listGroupHaveMessages: newListGroupHaveMessages,
            };
          } else {
            let newlistGroupSort = [...state.listGroup];

            for (let i = 0; i < newlistGroupSort.length; i++) {
              if (newlistGroupSort[i].id === to_group) {
                const item = { ...newlistGroupSort[i] };
                newlistGroupSort.splice(i, 1);

                newlistGroupSort.unshift({
                  ...item,
                  lastMessage: {
                    ...item.lastMessage,
                    contents: data.contents,
                    created_at: data.created_at,
                  },
                });
                break;
              }
            }

            const newListMessage = [
              ...state.listGroupHaveMessages[checkGroupChat].messages,
            ];

            const newMessage: IMessage = {
              uid: data.uid,
              contents: data.contents,
              created_at: data.created_at,
              type: data.type,
              to_group: data.to_group,
              profiles: {
                avatar: data.avatar,
                first_name: "",
                last_name: "",
              },
            };

            newListMessage.unshift(newMessage);
            const newGroupChat = {
              id_group: to_group,
              messages: [...newListMessage],
            };
            const newListGroupHaveMessages = [
              ...state.listGroupHaveMessages.map((e) => {
                if (e.id_group === to_group) {
                  return newGroupChat;
                }
                return e;
              }),
            ];
            return {
              ...state,
              listGroup: newlistGroupSort,
              listGroupHaveMessages: newListGroupHaveMessages,
            };
          }
        });
      });
    }
  }, [socket, uid]);
};

interface IUseSocket {
  socket: Socket | undefined;
  isError: boolean;
}

const token = getLocalStorage("token");

const socket = io(urlSocket, {
  extraHeaders: {
    authorization: "Bearer " + token,
  },
  path: "/v2/api/socket",
});

export const useSocket = (): IUseSocket => {
  const [socketIo, setSocketIoState] = useState<Socket>();
  const [isError, setIsError] = useState<boolean>(false);

  useEffect(() => {
    setSocketIoState(socket);
  }, []);

  useEffect(() => {
    if (socketIo) {
      socketIo.on("connect", function () {
        // console.log("connected");
      });
      socketIo.on("exception", function (data: any) {
        // console.log("exception", data);
        setIsError(true);
      });
    }
  }, [socketIo]);

  if (isError) {
    return {
      socket: undefined,
      isError: true,
    };
  }

  return {
    socket: socketIo,
    isError: false,
  };
};
