import { Observable } from "rxjs";
import { post } from "../HttpClient";
import { CreditCardPayment } from "@/models/payment";

export const createCreditCardCharge = (charge: CreditCardPayment): Observable<any> => {
    const url = `/checkout/credit-card`;
    return post(url, charge);
}

export const createIternetBankingCharge = (charge: CreditCardPayment): Observable<any> => {
    const url = `/checkout/prompt-pay`;
    return post(url, charge);
}

export const createCharge = (charge: CreditCardPayment, paymentMethod: string): Observable<any> => {
    let url = `/checkout/prompt-pay`
    paymentMethod === 'promptpay' ? url = `/checkout/prompt-pay` : url = `/checkout/credit-card`
    return post(url, charge);
}