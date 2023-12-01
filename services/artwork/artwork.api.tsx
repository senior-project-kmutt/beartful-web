import { Observable } from "rxjs";
import { get } from "../HttpClient";

const getArtwork = (page:number, pageSize:number): Observable<any> => {
  const params = `?page=${page}&pageSize=${pageSize}`
  return get(`/artwork${params}`);
};

export const fetchArtworkData = async (pageNumber:number) => {
  try {
    const res = await getArtwork(pageNumber, 30).toPromise();
    return res.data;
  } catch (error) {
    console.error("Error fetching artwork:", error);
    throw error;
  }
};
