import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Task } from '@models/task.model';

@Component({
  selector: 'app-recent-task',
  imports: [RouterLink],
  templateUrl: './recent-task.component.html',
  styleUrl: './recent-task.component.scss',
})
export class RecentTaskComponent {
  @Input() recentTasks: Task[];

  constructor() {
    this.recentTasks = [];
  }
  formatDate(date: Date): string {
    return date.toLocaleDateString();
  }
}
