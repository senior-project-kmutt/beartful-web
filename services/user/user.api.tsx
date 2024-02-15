import { Observable } from "rxjs";
import { get, getPromise, patchPromise, post } from "../HttpClient";
import { LoginUser, Users } from "@/models/users";
import { IncomingHttpHeaders } from "http";

export const createUser = (user: Users): Observable<void> => {
  const url = `/user/register`;

  return post(url, user);
};

export const login = (user: LoginUser): Observable<void> => {
  const url = `/user/login`;
  return post(url, user);
};

export const getUserById = (userId: string, headers: IncomingHttpHeaders): Promise<any> => {
  const url = `/user/${userId}`;
  return getPromise(url, headers);
};

export const getUserByUsername = (username: string): Observable<any> => {
  const url = `/user/freelance/${username}`;
  return get(url);
};

export const getChatRoomByUserId = (userId: string, headers: IncomingHttpHeaders): Promise<any> => {
  return getPromise(`/user/${userId}/chatRooms`, headers);
};

export const updateBankAccount = (userId: string, body: any, headers: IncomingHttpHeaders): Promise<any> => {
  return patchPromise(`/user/${userId}/updateBankAccount`, body, headers);
};

export const updateFreelanceDetails = (userId: string, body: any, headers: IncomingHttpHeaders): Promise<any> => {
  return patchPromise(`/user/${userId}/updateFreelanceDetails`, body, headers);
};

export const updatePersonal = (userId: string, body: any, headers: IncomingHttpHeaders): Promise<any> => {
  return patchPromise(`/user/${userId}/personal`, body, headers);
};