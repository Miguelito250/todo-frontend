import { Component, type OnInit } from "@angular/core"
import { CommonModule } from "@angular/common"
import { RouterLink } from "@angular/router"
import { FormsModule } from "@angular/forms"
import type { Task } from "../../../models/task.model"

@Component({
  selector: "app-task-list",
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  template: `
    <div class="space-y-6">
      <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <h1 class="text-2xl font-bold text-white">Tasks</h1>
        <div class="flex flex-col sm:flex-row gap-4">
          <div class="relative">
            <select 
              [(ngModel)]="statusFilter"
              (change)="filterTasks()"
              class="block w-full pl-3 pr-10 py-2 text-base border-gray-700 bg-gray-800 text-white rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >
              <option value="all">All Tasks</option>
              <option value="pending">Pending</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
          </div>
          <a 
            routerLink="/tasks/new" 
            class="px-4 py-2 bg-indigo-600 text-white text-center rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Add New Task
          </a>
        </div>
      </div>
      
      <!-- Task list -->
      <div class="bg-gray-800 rounded-lg shadow border border-gray-700 overflow-hidden">
        <div class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-700">
            <thead class="bg-gray-700">
              <tr>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Title
                </th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Status
                </th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Created
                </th>
                <th scope="col" class="px-6 py-3 text-right text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody class="bg-gray-800 divide-y divide-gray-700">
              @for (task of filteredTasks; track task.id) {
                <tr>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="flex items-center">
                      <div>
                        <div class="text-sm font-medium text-white">{{ task.title }}</div>
                        <div class="text-sm text-gray-400">{{ task.description }}</div>
                      </div>
                    </div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <span 
                      class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full"
                      [ngClass]="{
                        'bg-blue-100 text-blue-800': task.status === 'pending',
                        'bg-yellow-100 text-yellow-800': task.status === 'in-progress',
                        'bg-green-100 text-green-800': task.status === 'completed'
                      }"
                    >
                      {{ formatStatus(task.status) }}
                    </span>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                    {{ formatDate(task.createdAt) }}
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div class="flex justify-end space-x-2">
                      <a 
                        [routerLink]="['/tasks/edit', task.id]" 
                        class="text-indigo-400 hover:text-indigo-300"
                      >
                        Edit
                      </a>
                      <button 
                        (click)="deleteTask(task.id)"
                        class="text-red-400 hover:text-red-300"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              } @empty {
                <tr>
                  <td colspan="4" class="px-6 py-4 text-center text-gray-400">
                    No tasks found. Create your first task!
                  </td>
                </tr>
              }
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `,
})
export class TaskListComponent implements OnInit {
  tasks: Task[] = []
  filteredTasks: Task[] = []
  statusFilter = "all"

  ngOnInit(): void {
    // In a real app, you would fetch this data from your service
    this.tasks = [
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
      {
        id: 3,
        title: "Implement authentication",
        description: "Add user registration and login functionality",
        status: "pending",
        createdAt: new Date(2023, 4, 20),
      },
      {
        id: 4,
        title: "Write unit tests",
        description: "Create tests for all core functionality",
        status: "pending",
        createdAt: new Date(2023, 4, 22),
      },
      {
        id: 5,
        title: "Deploy application",
        description: "Deploy the application to production environment",
        status: "pending",
        createdAt: new Date(2023, 4, 25),
      },
    ]

    this.filterTasks()
  }

  filterTasks(): void {
    if (this.statusFilter === "all") {
      this.filteredTasks = [...this.tasks]
    } else {
      this.filteredTasks = this.tasks.filter((task) => task.status === this.statusFilter)
    }
  }

  formatStatus(status: string): string {
    switch (status) {
      case "pending":
        return "Pending"
      case "in-progress":
        return "In Progress"
      case "completed":
        return "Completed"
      default:
        return status
    }
  }

  formatDate(date: Date): string {
    return date.toLocaleDateString()
  }

  deleteTask(id: number): void {
    // In a real app, you would call your service to delete the task
    this.tasks = this.tasks.filter((task) => task.id !== id)
    this.filterTasks()
  }
}
