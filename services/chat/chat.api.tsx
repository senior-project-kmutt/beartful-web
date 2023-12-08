import { getPromise, postPromise } from "../HttpClient";
import { IncomingHttpHeaders } from "http";
import { IMassage } from "@/components/Chat/ChatMessage";

export const getChatRoomByUserId = (userId: string, headers: IncomingHttpHeaders): Promise<any> => {
  return getPromise(`/user/${userId}/chatRooms`, headers);
};

export const getMessageByChatRoomId = (chatRoomId: string, headers: IncomingHttpHeaders): Promise<any> => {
  return getPromise(`/chatRoom/${chatRoomId}/messages`, headers);
}

export const getLatestMessageByChatRoomId = (chatRoomId: string, headers: IncomingHttpHeaders): Promise<any> => {
  return getPromise(`/chatRoom/${chatRoomId}/latestMessage`, headers);
}

export const sendMessage = (data: IMassage, headers: IncomingHttpHeaders): Promise<any> => {
  return postPromise(`/message`, data, headers);
}
