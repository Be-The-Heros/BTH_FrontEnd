import { atom } from "recoil";

interface IProfile {
  avatar: string;
  first_name: string;
  last_name: string;
}

export interface IMessage {
  id?:string;
  uid: string;
  to_group: string;
  type: "text" | "img" | "file";
  contents: string;
  created_at: Date;
  updated_at?: Date;
  profiles?: IProfile;
}

interface IMessageGroupChat {
  id_group: string;
  messages: IMessage[];
}

export interface IGroupChat {
  id: string;
  name_group: string;
  avatar: string;
  lastMessage?: {
    uid?: string;
    to_group?: string;
    type?: string;
    contents?: string;
    created_at?: Date;
    updated_at?: Date;
  };
}

export interface IGroupChatState {
  roomId: string;
  listGroup: IGroupChat[];
  listGroupHaveMessages: IMessageGroupChat[];
}

export const groupChatState = atom({
  key: "groupChatState", // unique ID (with respect to other atoms/selectors)
  default: {
    roomId: "",
    listGroup: [],
    listGroupHaveMessages: [],
  } as IGroupChatState, // default value (aka initial value)
});
