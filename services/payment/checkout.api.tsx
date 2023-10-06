import { Observable } from "rxjs";
import { post } from "../HttpClient";
import { CreditCardPayment } from "@/models/payment";

export const createCreditCardCharge = (charge:CreditCardPayment): Observable<void> => {
    const url = `/checkout/credit-card`;
    return post(url,charge);
}