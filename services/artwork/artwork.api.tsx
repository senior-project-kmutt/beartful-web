import { Observable } from "rxjs";
import { get } from "../HttpClient";

export const getArtwork = (page: number, pageSize: number, type: string): Observable<any> => {
  const params = `?page=${page}&pageSize=${pageSize}&type=${type}`
  return get(`/artwork${params}`);
};

export const getFreelanceArtwork = (userId: string, page: number, pageSize: number, type: string): Observable<any> => {
  const params = `/user/${userId}/artworks?page=${page}&pageSize=${pageSize}&type=${type}`
  return get(`${params}`);
};

export const fetchArtworkData = async (pageNumber: number, type: string, isSpecificFreelance: boolean, username: string) => {
  try {
    const apiCall = isSpecificFreelance ? getFreelanceArtwork(username, pageNumber, 50, type) : getArtwork(pageNumber, 50, type);
    const res = await apiCall.toPromise();
    return res.data;
  } catch (error) {
    console.error("Error fetching artwork:", error);
    throw error;
  }
};
