import { Observable } from "rxjs";
import { get, post } from "./HttpClient"
import { IMassage } from "@/components/Chat/ChatMessage";

export const getMessageByChatRoomId = (chatRoomId: string): Observable<any> => {
    return get(`/message/${chatRoomId}`);
}

export const sendMessage = (data: IMassage): Observable<any> => {
    return post(`/message`, data);
}