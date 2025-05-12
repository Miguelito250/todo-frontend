import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-auth-layaout',
  standalone: true,
  imports: [RouterOutlet],
  template: `<router-outlet />`,
})

/**
 * El authLayaout es el encargado de cambiar entre las vistas de Login y register
 */

export class AuthLayaoutComponent {}
