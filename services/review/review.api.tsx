import { get, postPromise } from "../HttpClient";
import { IncomingHttpHeaders } from "http";
import { Review } from "@/models/review";

export const createNewReview = (body: Review, headers: IncomingHttpHeaders): Promise<any> => {
  const url = `/reviews`;
  return postPromise(url, body, headers);
};

export const getFreelanceReviews = (username: string) => {
  const url = `/user/freelance/${username}/reviews`;
  return get(url)
}

export const getFreelanceAverageScore = (username: string) => {
  const url = `/user/freelance/${username}/reviews/averageScore`;
  return get(url)
}