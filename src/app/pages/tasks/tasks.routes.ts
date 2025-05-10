import { Routes } from '@angular/router';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { TaskListComponent } from './task-list/task-list.component';
import { TaskFormComponent } from './task-form/task-form.component';

export const MAIN_ROUTES: Routes = [
    { path: "", redirectTo: "dashboard", pathMatch: "full" },
    { path: "dashboard", component: DashboardComponent },
    { path: "tasks", component: TaskListComponent },
    { path: "tasks/new", component: TaskFormComponent },
    { path: "tasks/edit/:id", component: TaskFormComponent },
];
