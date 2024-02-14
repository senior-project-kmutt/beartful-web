import { Observable } from "rxjs";
import { get } from "../HttpClient";
import { IncomingHttpHeaders } from "http";

export const getCustomerPurchaseOrder = (userId: string, status: string, headers: IncomingHttpHeaders): Observable<any> => {
    return get(`/user/customer/${userId}/orders?status=${status}`, headers);
};

export const getFreelancePurchaseOrder = (userId: string, status: string, headers: IncomingHttpHeaders): Observable<any> => {
    return get(`/user/freelance/${userId}/orders?status=${status}`, headers);
};
