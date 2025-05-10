import type { Routes } from '@angular/router';
import { MainLayaoutComponent } from './layaout/main-layaout/main-layaout.component';
import { AuthLayaoutComponent } from './layaout/auth-layaout/auth-layaout.component';
import { MAIN_ROUTES } from './pages/tasks/tasks.routes';
import { AUTH_ROUTES } from './pages/auth/auth.routes';

export const routes: Routes = [
  {
    path: '',
    component: MainLayaoutComponent,
    children: MAIN_ROUTES,
  },
  {
    path: 'auth',
    component: AuthLayaoutComponent,
    children: AUTH_ROUTES,
  },
  { path: '**', redirectTo: 'auth/login' },
];
