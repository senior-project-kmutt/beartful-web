import { Observable } from "rxjs";
import { get, getPromise, post } from "../HttpClient";
import { IncomingHttpHeaders } from "http";
import { IMassage } from "@/components/Chat/ChatMessage";

export const getChatRoomByUserId = (userId: string, headers: IncomingHttpHeaders): Promise<any> => {
  return getPromise(`/chatRoom/${userId}`, headers);
};

export const getMessageByChatRoomId = (chatRoomId: string): Observable<any> => {
  return get(`/message/${chatRoomId}`);
}

export const getLatestMessageByChatRoomId = (chatRoomId: string): Observable<any> => {
  return get(`/message/latest/${chatRoomId}`);
}

export const sendMessage = (data: IMassage): Observable<any> => {
  return post(`/message`, data);
}
