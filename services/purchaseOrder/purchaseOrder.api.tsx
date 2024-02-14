import { Observable } from "rxjs";
import { get, postPromise } from "../HttpClient";
import { IncomingHttpHeaders } from "http";
import { ICreatePurchaseOrder } from "@/models/purchaseOrder";

export const getCustomerPurchaseOrder = (userId: string, status: string, headers: IncomingHttpHeaders): Observable<any> => {
    return get(`/user/customer/${userId}/orders?status=${status}`, headers);
};

export const getFreelancePurchaseOrder = (userId: string, status: string, headers: IncomingHttpHeaders): Observable<any> => {
    return get(`/user/freelance/${userId}/orders?status=${status}`, headers);
};

export const createPurchaseOrder = (purchaseOrder: ICreatePurchaseOrder, headers: IncomingHttpHeaders): Promise<any> => {
    return postPromise(`/purchaseOrders`, purchaseOrder, headers);
};
