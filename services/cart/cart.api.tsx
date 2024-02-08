import { Observable } from "rxjs";
import { deleteMethod, get, patch, post } from "../HttpClient";
import { IncomingHttpHeaders } from "http";
import { ICartAdd, ICartEdit } from "@/models/cart";

export const createCart = (body: ICartAdd, headers: IncomingHttpHeaders): Observable<any> => {
    return post(`/carts`, body, headers);
};

export const getCart = (userId: string, type: string): Observable<any> => {
    const typeParam = type ? `?type=${type}` : '';
    return get(`/user/${userId}/carts${typeParam}`);
};

export const getReviewOrderCart = (userId: string, type: string): Observable<any> => {
    const typeParam = type ? `?type=${type}` : '';
    return get(`/user/${userId}/carts/reviewOrder${typeParam}`);
};

export const editCartById = (cartId: string, body: ICartEdit, headers: IncomingHttpHeaders): Observable<any> => {
    return patch(`/carts/${cartId}`, body, headers);
};

export const deleteCartById = (cartId: string, headers: IncomingHttpHeaders) => {
    return deleteMethod(`/carts/${cartId}`, headers)
}