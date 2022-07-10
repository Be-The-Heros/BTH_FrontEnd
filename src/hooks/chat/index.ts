import apis from "apis";
import { generateURLImage } from "hooks/image/useCreateImageURL";
import { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { groupChatState, IGroupChat } from "recoil/roomChat";
import { userState } from "recoil/users/state";
import { API_CHAT } from "./configs";

export * from "./socketHooks";

interface IUseGetListGroupsChat {
  isLoading: boolean;
}

export const useGetListGroupsChat = (): IUseGetListGroupsChat => {
  const infoUser = useRecoilValue(userState);
  const [groupChat, setGroupChatState] = useRecoilState(groupChatState);
  const [isLoading, setIsLoading] = useState(false);

  const getData = async () => {
    const data = await apis.get<IGroupChat[]>(API_CHAT, "/get-list-chat");

    if (data) {
      setGroupChatState((state) => ({
        ...state,
        listGroup: data || [],
      }));
    }
    setIsLoading(false);
  };

  useEffect(() => {
    try {
      if (groupChat.listGroup.length === 0) {
        setIsLoading(false);
        infoUser.token && getData();
      } else {
        setIsLoading(false);
      }
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  }, [infoUser, groupChat.listGroup]);

  useEffect(() => {
    try {
      infoUser.token && getData();
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  }, [groupChat.reload]);

  return {
    isLoading,
  };
};

interface IProfile {
  avatar: string;
  first_name: string;
  last_name: string;
}

export interface IMessage {
  id?: string;
  uid: string;
  to_group: string;
  type: "text" | "img" | "file";
  contents: string;
  created_at: Date;
  updated_at?: Date;
  profiles?: IProfile;
}

interface IUseGetListMessages {
  listMessages: IMessage[];
  isLoading: boolean;
}

export const useGetListMessages = (
  group_id: string | undefined
): IUseGetListMessages => {
  const infoUser = useRecoilValue(userState);
  const [groupChat, setGroupChatState] = useRecoilState(groupChatState);
  const [listMessages, setlistMessages] = useState<IMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getData = async () => {
      const data = await apis.get<IMessage[]>(
        API_CHAT,
        "/get-list-message?group_chat_id=" + group_id
      );

      if (data && group_id) {
        // setlistGroupChat((data.data as IGroupChat[]) || []);
        // check and push group chat to state recoil
        const checkGroupChat = groupChat.listGroupHaveMessages.findIndex(
          (e) => e.id_group === group_id
        );

        setlistMessages((data || []) as IMessage[]);
        setIsLoading(true);

        if (checkGroupChat === -1) {
          const newListGroupHaveMessages = [
            ...groupChat.listGroupHaveMessages,
            {
              id_group: group_id,
              messages: data || [],
            },
          ];

          setGroupChatState((state) => ({
            ...state,
            listGroupHaveMessages: newListGroupHaveMessages,
          }));
        }
      } else {
        setIsLoading(false);
      }
    };

    try {
      if (group_id && infoUser.token) {
        // find in state recoil if exit return
        const checkGroupChat = groupChat.listGroupHaveMessages.findIndex(
          (e) => e.id_group === group_id
        );

        if (checkGroupChat === -1) {
          setIsLoading(true);
          getData();
        } else {
          setlistMessages(
            groupChat.listGroupHaveMessages[checkGroupChat].messages
          );
          setIsLoading(false);
        }
      }
    } catch (error) {
      console.log(error);
    }
  }, [group_id, groupChat]);

  return { listMessages, isLoading };
};

export const editNameGroup = async (groupId: string, nameGroup: string) => {
  try {
    const data = await apis.put(API_CHAT, "/edit-name-group", {
      body: {
        groupId,
        nameGroup,
      },
    });
    return data;
  } catch (error) {
    return undefined;
    console.log(error);
  }
};

export const editImgGroup = async (groupId: string, file: any) => {
  try {
    const avatarGroup = await generateURLImage(file);

    const data = await apis.put(API_CHAT, "/edit-avatar-group", {
      body: {
        groupId,
        avatarGroup: avatarGroup.urls[0],
      },
    });
    return data;
  } catch (error) {
    console.log(error);
    return undefined;
  }
};
