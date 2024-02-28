import { ProfileType } from "../[id]/_types/message";

export interface ChatType {
  projectId: number;
  chatRoomId: string;
  lastMessage: string;
  lastMessageCreatedAt: string;
  status: "OPEN" | "CLOSE";
  profiles: [ChatProfileType, ChatProfileType];
}

export interface ChatProfileType extends ProfileType {
  userId: number;
}