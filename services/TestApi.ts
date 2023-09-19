import { Observable } from "rxjs";
import { get } from "./HttpClient"

export const testApi = (): Observable<any> => {
    return get('/v1/user');
}