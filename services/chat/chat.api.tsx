import { getPromise } from "../HttpClient";
import { IncomingHttpHeaders } from "http";

export const getChatRoomByUserId = (userId: string, headers: IncomingHttpHeaders): Promise<any> => {
  return getPromise(`/chatRoom/${userId}`, headers);
};
