import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ApiRequestConfig } from './interfaces/apiRequestConfig.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RequestService {
  private _http = inject(HttpClient);

  request<T>(config: ApiRequestConfig): Observable<T> {
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        ...(config.headers || {})
      }),
      params: new HttpParams({ fromObject: config.params || {} })
    };    

    switch (config.method) {
      case 'GET':
        return this._http.get<T>(config.url, options);
      case 'POST':
        return this._http.post<T>(config.url, config.body, options);
      case 'PUT':
        return this._http.put<T>(config.url, config.body, options);
      case 'PATCH':
        return this._http.patch<T>(config.url, config.body, options);
      case 'DELETE':
        return this._http.delete<T>(config.url, options);
      default:
        throw new Error('Method HTTP not soported');
    }
  }
}
