import { Observable } from "rxjs";
import { deleteMethod, get, patch } from "../HttpClient";
import { IncomingHttpHeaders } from "http";
import { ICartEdit } from "@/models/cart";

export const getCart = (userId: string, type: string): Observable<any> => {
    const typeParam = type ? `?type=${type}` : '';
    return get(`/user/${userId}/carts${typeParam}`);
};

export const editCartById = (cartId: string, body: ICartEdit, headers: IncomingHttpHeaders): Observable<any> => {
    return patch(`/carts/${cartId}`, body, headers);
};

export const deleteCartById = (cartId: string, headers: IncomingHttpHeaders) => {
    return deleteMethod(`/carts/${cartId}`, headers)
}