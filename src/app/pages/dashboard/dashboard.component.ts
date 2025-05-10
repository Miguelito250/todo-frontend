import { Component, type OnInit } from "@angular/core"
import { CommonModule } from "@angular/common"
import { RouterLink } from "@angular/router"
import type { Task } from "../../models/task.model"

@Component({
  selector: "app-dashboard",
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="space-y-6">
      <div class="flex items-center justify-between">
        <h1 class="text-2xl font-bold text-white">Dashboard</h1>
        <a 
          routerLink="/tasks/new" 
          class="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Add New Task
        </a>
      </div>
      
      <!-- Task summary cards -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div class="bg-gray-800 rounded-lg shadow p-6 border border-gray-700">
          <div class="flex items-center">
            <div class="p-3 rounded-full bg-blue-500 bg-opacity-10">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            <div class="ml-5">
              <p class="text-gray-400 text-sm font-medium">Total Tasks</p>
              <p class="text-2xl font-bold text-white">{{ totalTasks }}</p>
            </div>
          </div>
        </div>
        
        <div class="bg-gray-800 rounded-lg shadow p-6 border border-gray-700">
          <div class="flex items-center">
            <div class="p-3 rounded-full bg-yellow-500 bg-opacity-10">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div class="ml-5">
              <p class="text-gray-400 text-sm font-medium">In Progress</p>
              <p class="text-2xl font-bold text-white">{{ inProgressTasks }}</p>
            </div>
          </div>
        </div>
        
        <div class="bg-gray-800 rounded-lg shadow p-6 border border-gray-700">
          <div class="flex items-center">
            <div class="p-3 rounded-full bg-green-500 bg-opacity-10">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <div class="ml-5">
              <p class="text-gray-400 text-sm font-medium">Completed</p>
              <p class="text-2xl font-bold text-white">{{ completedTasks }}</p>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Recent tasks -->
      <div class="bg-gray-800 rounded-lg shadow border border-gray-700">
        <div class="px-6 py-4 border-b border-gray-700">
          <h2 class="text-lg font-medium text-white">Recent Tasks</h2>
        </div>
        <div class="divide-y divide-gray-700">
          @for (task of recentTasks; track task.id) {
            <div class="px-6 py-4 flex items-center">
              <div 
                class="h-3 w-3 rounded-full mr-4" 
                [ngClass]="{
                  'bg-blue-500': task.status === 'pending',
                  'bg-yellow-500': task.status === 'in-progress',
                  'bg-green-500': task.status === 'completed'
                }"
              ></div>
              <div class="flex-1 min-w-0">
                <p class="text-sm font-medium text-white truncate">{{ task.title }}</p>
                <p class="text-sm text-gray-400 truncate">{{ task.description }}</p>
              </div>
              <div class="ml-4 flex-shrink-0">
                <p class="text-sm text-gray-400">{{ formatDate(task.createdAt) }}</p>
              </div>
              <div class="ml-4 flex-shrink-0">
                <a 
                  [routerLink]="['/tasks/edit', task.id]" 
                  class="text-sm font-medium text-indigo-400 hover:text-indigo-300"
                >
                  Edit
                </a>
              </div>
            </div>
          } @empty {
            <div class="px-6 py-4 text-center text-gray-400">
              No tasks found. Create your first task!
            </div>
          }
        </div>
        @if (recentTasks.length > 0) {
          <div class="px-6 py-4 border-t border-gray-700">
            <a 
              routerLink="/tasks" 
              class="text-sm font-medium text-indigo-400 hover:text-indigo-300"
            >
              View all tasks
            </a>
          </div>
        }
      </div>
    </div>
  `,
})
export class DashboardComponent implements OnInit {
  totalTasks = 0
  pendingTasks = 0
  inProgressTasks = 0
  completedTasks = 0
  recentTasks: Task[] = []

  ngOnInit(): void {
    // In a real app, you would fetch this data from your service
    this.recentTasks = [
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
    ]

    this.totalTasks = this.recentTasks.length
    this.pendingTasks = this.recentTasks.filter((task) => task.status === "pending").length
    this.inProgressTasks = this.recentTasks.filter((task) => task.status === "in-progress").length
    this.completedTasks = this.recentTasks.filter((task) => task.status === "completed").length
  }

  formatDate(date: Date): string {
    return date.toLocaleDateString()
  }
}
