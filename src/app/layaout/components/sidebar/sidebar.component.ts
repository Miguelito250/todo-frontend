import { Component, inject, Input, output, WritableSignal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { IModules } from './interfaces/modules.interface';
import { AuthService } from '@core/services/auth/auth.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './sidebar.component.html',
})
export class SidebarComponent {
  private readonly _authService: AuthService = inject(AuthService);

  @Input() isVisible!: () => boolean;
  @Input() toggle!: () => void;

  public modulesLinks: IModules[];

  constructor() {
    this.modulesLinks = [
      {
        urlRedirect: '/dashboard',
        icon: 'fa-solid fa-house',
        textShow: 'Dashboard',
      },
      {
        urlRedirect: '/tasks',
        icon: 'fa-solid fa-list-check',
        textShow: 'Tareas',
      },
    ];
  }

  public logout(){
    this._authService.logout();
  }
}
