import { Component, inject } from '@angular/core';
import { NavigationStart, Router, RouterOutlet } from '@angular/router';
import { AuthService } from '@core/services/auth/auth.service';
import { filter } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
})
export class AppComponent {
  private router = inject(Router);
  private authService = inject(AuthService);

  constructor() {
    this.router.events
      .pipe(filter(event => event instanceof NavigationStart))
      .subscribe((event: NavigationStart) => {
        const isLoggedIn = !!this.authService.getAccessToken();
        const isPublicRoute = event.url === '/login' || event.url === '/register';

        if (!isLoggedIn && !isPublicRoute) {
          this.router.navigate(['/login']);
        }
      });
  }
}
