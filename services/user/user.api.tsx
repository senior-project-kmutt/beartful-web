import { Observable } from "rxjs";
import { post } from "../HttpClient";
import { LoginUser, Users } from "@/models/users";

export const createUser = (user: Users): Observable<void> => {
  const url = `/user/register`;

  return post(url, user);
};

export const login = (user: LoginUser): Observable<void> => {
  const url = `/user/login`;
  return post(url, user);
};
