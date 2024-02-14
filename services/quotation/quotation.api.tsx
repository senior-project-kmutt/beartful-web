import { getPromise, postPromise } from "../HttpClient";
import { Quotation } from "@/models/quotation";
import { IncomingHttpHeaders } from "http";

export const createQuotation = (quotation: Quotation, headers: IncomingHttpHeaders): Promise<any> => {
    const url = `/quotations`;
    return postPromise(url, quotation, headers)
}

export const getQuotationByCustomerId = (userId: string, headers: IncomingHttpHeaders): Promise<any> => {
    const url = `/user/${userId}/quotations`;
    return getPromise(url, headers)
}

export const getQuotationById = (quotationId: string, headers: IncomingHttpHeaders): Promise<any> => {
    const url = `/quotations/${quotationId}`;
    return getPromise(url, headers)
}