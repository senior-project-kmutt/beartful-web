import { Observable } from "rxjs";
import { deleteMethod, get } from "../HttpClient";
import { postPromise } from "../HttpClient";
import { ArtworkFormData } from "@/components/Artwork/CRUDArtwork/ArtworkForm";
import { IncomingHttpHeaders } from "http";

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

export const createArtwork = async (body: ArtworkFormData, headers: IncomingHttpHeaders): Promise<any> => {
  return await postPromise(`/artwork`, body, headers);
};

export const deleteArtwork = (artworkId: string) => {
  return deleteMethod(`/artwork/${artworkId}`)

}