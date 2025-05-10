import { Component, type OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Task } from '@models/task.model';
import { SummaryCardsComponent } from './components/summary-cards/summary-cards.component';
import { Dashboard } from '@models/dashboard.model';
import { RecentTaskComponent } from './components/recent-task/recent-task.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterLink, SummaryCardsComponent, RecentTaskComponent],
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit {
  public dashboard: Dashboard;
  completedTasks = 0;
  recentTasks: Task[] = [];

  constructor() {
    this.dashboard = {
      totalTasks: 0,
      completedTasks: 0,
      pendingTasks: 0,
      inProgressTasks: 0,
    };
  }

  ngOnInit(): void {
    this.dashboard.totalTasks = this.recentTasks.length;
    this.dashboard.pendingTasks = this.recentTasks.filter(
      (task) => task.status === 'pending'
    ).length;
    this.dashboard.inProgressTasks = this.recentTasks.filter(
      (task) => task.status === 'in-progress'
    ).length;
    this.dashboard.completedTasks = this.recentTasks.filter(
      (task) => task.status === 'completed'
    ).length;
  }
}
