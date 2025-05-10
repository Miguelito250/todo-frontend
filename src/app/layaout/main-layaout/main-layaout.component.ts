import { Component, computed, signal, WritableSignal } from '@angular/core';
import { SidebarComponent } from '../components/sidebar/sidebar.component';
import { NavbarComponent } from '../components/navbar/navbar.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-main-layaout',
  imports: [RouterOutlet, NavbarComponent, SidebarComponent],
  templateUrl: './main-layaout.component.html',
  styleUrl: './main-layaout.component.scss'
})
export class MainLayaoutComponent {
  readonly sidebarOpen = signal(false);

  // Signal reactivo al tamaño de pantalla
  readonly isDesktop = signal(window.innerWidth >= 768);

  readonly isSidebarVisible = computed(() => {
    return this.isDesktop() || this.sidebarOpen();
  });

  toggleSidebar = () => {
    this.sidebarOpen.update(value => !value);
  }

  constructor() {
    // Listener para cambios de tamaño de ventana
    const mediaQuery = window.matchMedia('(min-width: 768px)');
    const update = () => this.isDesktop.set(mediaQuery.matches);

    mediaQuery.addEventListener('change', update);
    update(); // actualizar inmediatamente
  }
}
