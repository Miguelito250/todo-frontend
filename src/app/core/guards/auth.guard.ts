import { inject, Injectable } from "@angular/core"
import { CanActivate, Router, UrlTree } from "@angular/router"
import { AuthService } from "@core/services/auth/auth.service";
import { catchError, map, Observable, of } from "rxjs";

@Injectable({
  providedIn: "root",
})

/**
 * La class AuthGuard es la encargada de hacer una petición al backend
 * para saber si el token que tiene en el header es valido o no
 */

export class AuthGuard implements CanActivate {
  private authService = inject(AuthService);
  private _router = inject(Router);

  canActivate(): Observable<boolean | UrlTree> {
    return this.authService.validateToken().pipe(
      map(() => true), 
      catchError(() => of(this._router.parseUrl('auth/login')))
    );
  }
}
