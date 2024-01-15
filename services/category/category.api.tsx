import { Observable } from "rxjs";
import { get } from "../HttpClient";

export const getAllCategories = (): Observable<any> => {
    return get(`/categories`);
};

