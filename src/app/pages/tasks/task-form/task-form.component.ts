import { Component, inject, type OnInit } from "@angular/core"
import { CommonModule } from "@angular/common"
import { FormBuilder, type FormGroup, ReactiveFormsModule, Validators } from "@angular/forms"
import { ActivatedRoute, Router } from "@angular/router"
import type { Task } from "../../../models/task.model"

@Component({
  selector: "app-task-form",
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="space-y-6">
      <div class="flex items-center justify-between">
        <h1 class="text-2xl font-bold text-white">{{ isEditMode ? 'Edit Task' : 'Create New Task' }}</h1>
      </div>
      
      <div class="bg-gray-800 rounded-lg shadow border border-gray-700 p-6">
        <form [formGroup]="taskForm" (ngSubmit)="onSubmit()">
          <div class="space-y-6">
            <div>
              <label for="title" class="block text-sm font-medium text-gray-300">Title</label>
              <input 
                type="text" 
                id="title" 
                formControlName="title"
                class="mt-1 block w-full border border-gray-700 rounded-md bg-gray-900 text-white shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm p-2"
                placeholder="Task title"
              >
              @if (taskForm.get('title')?.invalid && taskForm.get('title')?.touched) {
                <p class="mt-1 text-sm text-red-500">
                  @if (taskForm.get('title')?.errors?.['required']) {
                    Title is required
                  } @else if (taskForm.get('title')?.errors?.['maxlength']) {
                    Title must be less than 100 characters
                  }
                </p>
              }
            </div>
            
            <div>
              <label for="description" class="block text-sm font-medium text-gray-300">Description</label>
              <textarea 
                id="description" 
                formControlName="description"
                rows="3" 
                class="mt-1 block w-full border border-gray-700 rounded-md bg-gray-900 text-white shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm p-2"
                placeholder="Task description"
              ></textarea>
              @if (taskForm.get('description')?.invalid && taskForm.get('description')?.touched) {
                <p class="mt-1 text-sm text-red-500">
                  @if (taskForm.get('description')?.errors?.['maxlength']) {
                    Description must be less than 500 characters
                  }
                </p>
              }
            </div>
            
            <div>
              <label for="status" class="block text-sm font-medium text-gray-300">Status</label>
              <select 
                id="status" 
                formControlName="status"
                class="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-700 bg-gray-900 text-white rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              >
                <option value="pending">Pending</option>
                <option value="in-progress">In Progress</option>
                <option value="completed">Completed</option>
              </select>
            </div>
            
            <div class="flex justify-end space-x-3">
              <button 
                type="button" 
                (click)="cancel()"
                class="px-4 py-2 border border-gray-700 text-gray-300 rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
              >
                Cancel
              </button>
              <button 
                type="submit" 
                [disabled]="taskForm.invalid"
                class="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {{ isEditMode ? 'Update Task' : 'Create Task' }}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  `,
})
export class TaskFormComponent implements OnInit {
  private _fb = inject(FormBuilder);
  private _router = inject(Router)
  private _route = inject(ActivatedRoute)
  

  taskForm: FormGroup
  isEditMode = false
  taskId: number | null = null

  // Mock tasks data (in a real app, this would come from a service)
  tasks: Task[] = [
    {
      id: 1,
      title: "Complete project proposal",
      description: "Write and submit the project proposal document",
      status: "completed",
      createdAt: new Date(2023, 4, 15),
    },
    {
      id: 2,
      title: "Design user interface",
      description: "Create wireframes and mockups for the new application",
      status: "in-progress",
      createdAt: new Date(2023, 4, 18),
    },
  ]

  constructor(
  ) {
    this.taskForm = this._fb.group({
      title: ["", [Validators.required, Validators.maxLength(100)]],
      description: ["", [Validators.maxLength(500)]],
      status: ["pending"],
    })
  }

  ngOnInit(): void {
    const id = this._route.snapshot.paramMap.get("id")
    if (id) {
      this.isEditMode = true
      this.taskId = +id

      // In a real app, you would fetch the task from your service
      const task = this.tasks.find((t) => t.id === this.taskId)
      if (task) {
        this.taskForm.patchValue({
          title: task.title,
          description: task.description,
          status: task.status,
        })
      }
    }
  }

  onSubmit(): void {
    if (this.taskForm.valid) {
      const formValue = this.taskForm.value

      if (this.isEditMode && this.taskId) {
        // In a real app, you would call your service to update the task
        console.log("Updating task", this.taskId, formValue)
      } else {
        // In a real app, you would call your service to create a new task
        console.log("Creating new task", formValue)
      }

      this._router.navigate(["/tasks"])
    } else {
      this.taskForm.markAllAsTouched()
    }
  }

  cancel(): void {
    this._router.navigate(["/tasks"])
  }
}
