import { Observable } from "rxjs";
import { get, post } from "./HttpClient"
import { IMassage } from "@/pages/chat";

export const getMessageByChatRoomId = (chatRoomId: number): Observable<any> => {
    return get(`/message/${chatRoomId}`);
}

export const sendMessage = (data: IMassage): Observable<any> => {
    return post(`/message`, data);
}