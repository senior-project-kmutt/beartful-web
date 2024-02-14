import { Observable } from "rxjs";
import { deleteMethod, get, patch, post } from "../HttpClient";
import { ArtworkFormData } from "@/components/Profile/Freelance/Artwork/ArtworkAddForm";
import { IncomingHttpHeaders } from "http";

export const getArtwork = (page: number, pageSize: number, type: string): Observable<any> => {
  const params = `?page=${page}&pageSize=${pageSize}&type=${type}`
  return get(`/artwork${params}`);
};

export const getFreelanceArtwork = (userId: string, page: number, pageSize: number, type?: string): Observable<any> => {
  const typeParam = type ? `&type=${type}` : '';
  const params = `/user/${userId}/artworks?page=${page}&pageSize=${pageSize}${typeParam}`;
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

export const createArtwork = (body: ArtworkFormData, headers: IncomingHttpHeaders): Observable<any> => {
  return post(`/artwork`, body, headers);
};

export const deleteArtwork = (artworkId: string, headers: IncomingHttpHeaders) => {
  return deleteMethod(`/artwork/${artworkId}`, headers)
}

export const getArtworkById = (artworkId: string): Observable<any> => {
  return get(`/artwork/${artworkId}`);
};

export const editArtwork = (artworkId: string, body: ArtworkFormData, headers: IncomingHttpHeaders): Observable<any> => {
  return patch(`/artwork/${artworkId}`, body, headers);
};