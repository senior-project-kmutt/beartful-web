import Axios from './axios';
import { IncomingHttpHeaders } from 'http';
import { AxiosResponse } from '@/node_modules/axios/index';
import { Observable, from } from 'rxjs';
import { map } from 'rxjs/operators';

export const get = <T>(path: string): Observable<T> => {
  return from(Axios.get(path)).pipe(map(response => response as T));
};

export const post = <T>(path: string, data: any): Observable<T> => {
  return from(Axios.post(path, data)).pipe(map(response => response as T));
};

export const put = <T>(path: string, data: any): Observable<T> => {
  return from(Axios.put(path, data)).pipe(map(response => response as T));
};

export const patch = <T>(path: string, data: any): Observable<T> => {
  return from(Axios.patch(path, data)).pipe(
    map(response => response.data as T)
  );
};

export const deleteMethod = <T>(path: string): Observable<T> => {
  return from(Axios.delete(path)).pipe(map(response => response as T));
};

export const getPromise = <T>(
  path: string,
  headers?: IncomingHttpHeaders
): Promise<T> => {
  return Axios.get(path, {
    headers: headers || undefined
  }).then(response => response.data as T);
};

export const postPromise = <T>(
  path: string,
  data: any,
  headers?: IncomingHttpHeaders
): Promise<T> => {
  return Axios.post(path, data, {
    headers: headers || undefined
  }).then(response => response.data as T);
};

export const deletePromise = <T>(
  path: string,
  headers: IncomingHttpHeaders
): Promise<T> => {
  return Axios.delete(path, {
    headers: headers || undefined
  }).then(response => response.data as T);
};
