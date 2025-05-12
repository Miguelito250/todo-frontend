import { Component, inject, type OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Task } from '@models/task.model';
import { SummaryCardsComponent } from './components/summary-cards/summary-cards.component';
import { Dashboard } from '@models/dashboard.model';
import { RecentTaskComponent } from './components/recent-task/recent-task.component';
import { RouterLink } from '@angular/router';
import { TasksService } from '../tasks/services/tasks/tasks.service';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterLink, SummaryCardsComponent, RecentTaskComponent],
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit {
  private readonly _taskService: TasksService = inject(TasksService);
  private _subscriptions = new Subscription();

  tasks$: Observable<Task[]>;

  public dashboard: Dashboard;
  completedTasks = 0;
  recentTasks: Task[] = [];

  constructor() {
    this.tasks$ = this._taskService.tasks$;
    this.dashboard = {
      totalTasks: 0,
      completedTasks: 0,
      pendingTasks: 0,
      inProgressTasks: 0,
    };
  }

  ngOnInit(): void {
    this._subscriptions = this._taskService.tasks$.subscribe({
      next: (tasks) => {
        this.recentTasks = tasks;
        this.makeSummary();
      },
      error: (err) => console.error('Error al cargar tareas', err),
    });
    this._taskService.loadTasks();
  }

  /**
   * makeSummary es la encargada de organizar los valores del dashboard
   * asi como el total de tareas, tareas completadas y pendientes 
   */
  makeSummary() {
    this.dashboard.totalTasks = this.recentTasks.length;
    this.dashboard.pendingTasks = this.recentTasks.filter(
      (task) => task.status === 'pending'
    ).length;
    this.dashboard.inProgressTasks = this.recentTasks.filter(
      (task) => task.status === 'inProgress'
    ).length;
    this.dashboard.completedTasks = this.recentTasks.filter(
      (task) => task.status === 'completed'
    ).length;
  }
}
