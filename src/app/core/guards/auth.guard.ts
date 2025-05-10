import { Injectable } from "@angular/core"
import type { CanActivate, Router } from "@angular/router"

@Injectable({
  providedIn: "root",
})
export class AuthGuard implements CanActivate {
  // constructor(private router: Router) {}

  canActivate(): boolean {
    // In a real app, you would check if the user is authenticated
    // For now, we'll just return true to allow access
    return true

    // If not authenticated, redirect to login
    // this.router.navigate(['/login']);
    // return false;
  }
}
