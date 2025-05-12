import { Component, inject, OnDestroy, type OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import type { Task } from '@models/task.model';
import { TasksService } from '../services/tasks/tasks.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './task-list.component.html',
})
export class TaskListComponent implements OnInit, OnDestroy {
  private readonly _taskService: TasksService = inject(TasksService);
  private _subscriptions = new Subscription();

  public tasks: Task[] = [];
  public filteredTasks: Task[] = [];
  public statusFilter = 'all';

  ngOnInit(): void {
    const initalTasks = this._taskService.tasks$.subscribe((tasks) => {
      this.tasks = tasks;
      this.filterTasks();
    });

    this._subscriptions.add(initalTasks);
    this._taskService.loadTasks();
  }

  ngOnDestroy(): void {
    this._subscriptions.unsubscribe();
  }

  filterTasks(): void {
    if (this.statusFilter === 'all') {
      this.filteredTasks = this.tasks.filter((task) => task != null);
    } else {
      this.filteredTasks = this.tasks.filter(
        (task) => task && task.status === this.statusFilter
      );
    }
  }

  formatStatus(status: string): string {
    switch (status) {
      case 'pending':
        return 'Pending';
      case 'inProgress':
        return 'In Progress';
      case 'completed':
        return 'Completed';
      default:
        return status;
    }
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  }

  deleteTask(taskId: string): void {
    this._taskService.deleteTask(taskId);
  }
}
