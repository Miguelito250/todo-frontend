import { inject, Injectable } from '@angular/core';
import { Login } from '@models/login.model';
import { Register } from '@models/register.model';
import { IAuthResponse } from '@shared/interfaces/authResponse.interface';
import { RequestService } from '../request/request.service';
import { environment } from 'environments/environment';
import { catchError, Observable, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})

/**
 * El servicio de Auth es el encargado de hacer las peticiones con la información necesaria 
 * para solicitar el recurso a la API en .NET, su gran mayoria retornan observarbles quee en caso de que fallen ¿
 * los captura el cathError y lanza una excepcion
 */

export class AuthService {
  private readonly _requestService: RequestService = inject(RequestService);

  private _fullName: string | null = null;
  private _userId: string | null = null;

  constructor() {
    this._fullName = localStorage.getItem('fullName');
    this._userId = localStorage.getItem('userId');
  }

  login(data: Login): Observable<IAuthResponse> {
    return this._requestService
      .request<IAuthResponse>({
        method: 'POST',
        url: `${environment.apiUrl}auth`,
        body: data,
      })
      .pipe(
        tap((res) => {
          this.storeTokens(res);
          this.storeUser(res);
        }),
        catchError((error) => {
          console.error('Error in API:', error);
          return throwError(() => error);
        })
      );
  }

  register(data: Register): Observable<IAuthResponse | null> {
    return this._requestService
      .request<IAuthResponse>({
        method: 'POST',
        url: `${environment.apiUrl}users`,
        body: data,
      })
      .pipe(
        tap(() => {}),
        catchError((error) => {
          console.error('Error in API:', error);
          return throwError(() => error);
        })
      );
  }

  validateToken() {
    return this._requestService.request<any>({
      method: 'GET',
      url: `${environment.apiUrl}auth`,
      headers: {
        Authorization: `Bearer ${this.getAccessToken()}`,
      },
    });
  }

  private storeTokens(res: IAuthResponse): void {
    localStorage.setItem('accessToken', res.accessToken);
  }

  storeUser(data: { fullName: string; userId: string }) {
    this._fullName = data.fullName;
    this._userId = data.userId;

    localStorage.setItem('fullName', data.fullName);
    localStorage.setItem('userId', data.userId);
  }

  public logout(): void {
    this.clearUser()
    localStorage.removeItem('accessToken');
  }

  public getAccessToken(): string | null {
    return localStorage.getItem('accessToken');
  }

  get fullName(): string | null {
    return this._fullName;
  }

  get userId(): string | null {
    return this._userId;
  }

  clearUser() {
    this._fullName = null;
    this._userId = null;
    localStorage.removeItem('fullName');
    localStorage.removeItem('userId');
  }
}
