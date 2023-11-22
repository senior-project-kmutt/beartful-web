import { Observable } from "rxjs";
import { get } from "../HttpClient";

export const getArtwork = (page:number, pageSize:number): Observable<any> => {
  const params = `?page=${page}&pageSize=${pageSize}`
  return get(`/artwork${params}`);
};
