import { Observable } from "rxjs";
import { get } from "../HttpClient";

export const getArtwork = (): Observable<any> => {
  return get("/artwork");
};
