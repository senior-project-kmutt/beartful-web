import { Observable } from "rxjs";
import { post } from "../HttpClient";
import { Users } from "@/models/users";

export const createUser = (user: Users): Observable<void> => {
  const url = `/user`;
  return post(url, user);
};
