import { inject, Injectable } from '@angular/core';
import { Task } from '@models/task.model';
import { RequestService } from '@core/services/request/request.service';
import { environment } from 'environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { AuthService } from '@core/services/auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class TasksService {
  private readonly _requestService: RequestService = inject(RequestService);
  private readonly _authService: AuthService = inject(AuthService);

  private _tasks$ = new BehaviorSubject<Task[]>([]);

  tasks$ = this._tasks$.asObservable();

  updateTask(id: string, updatedTask: Task): Observable<Task> {
    return this._requestService.request<Task>({
      method: 'PUT',
      url: `${environment.apiUrl}tasks/${id}`,
      body: updatedTask,
    });
  }

  getTaskById(taskId: string): Observable<Task> {
    return this._requestService.request<Task>({
      method: 'GET',
      url: `${environment.apiUrl}tasks/${taskId}`,
    });
  }

  loadTasks(): void {
    this._requestService
      .request<Task[]>({
        method: 'GET',
        url: `${environment.apiUrl}tasks/tasksUser/${this._authService.userId}`,
      })
      .subscribe({
        next: (tasks) => this._tasks$.next(tasks),
        error: (err) => console.error(err),
      });
  }

  createTask(task: Omit<Task, 'id' | 'createdAt'>): void {
    this._requestService
      .request<Task>({
        method: 'POST',
        url: `${environment.apiUrl}tasks`,
        body: task,
      })
      .subscribe({
        next: (newTask) => {
          const updatedTasks = [...this._tasks$.value, newTask];
          this._tasks$.next(updatedTasks);
        },
        error: (err) => console.error(err),
      });
  }

  deleteTask(taskId: string): void {
    this._requestService
      .request({
        method: 'DELETE',
        url: `${environment.apiUrl}tasks/${taskId}`,
      })
      .subscribe({
        next: () => {
          const updatedTasks = this._tasks$.value.filter(
            (t) => t.id !== taskId
          );
          this._tasks$.next(updatedTasks);
        },
        error: (err) => console.error(err),
      });
  }
}
