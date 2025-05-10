import { Component, Input, output, WritableSignal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { IModules } from './interfaces/modules.interface';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './sidebar.component.html',
})
export class SidebarComponent {
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
}
