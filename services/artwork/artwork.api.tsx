import { Observable } from "rxjs";
import { get } from "../HttpClient";

const getArtwork = (page:number, pageSize:number, type:string): Observable<any> => {
  const params = `?page=${page}&pageSize=${pageSize}&type=${type}`
  return get(`/artwork${params}`);
};

export const fetchArtworkData = async (pageNumber:number, type:string) => {
  try {
    const res = await getArtwork(pageNumber, 50, type).toPromise();
    return res.data;
  } catch (error) {
    console.error("Error fetching artwork:", error);
    throw error;
  }
};
