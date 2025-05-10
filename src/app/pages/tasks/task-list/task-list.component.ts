import { Component, type OnInit } from "@angular/core"
import { CommonModule } from "@angular/common"
import { RouterLink } from "@angular/router"
import { FormsModule } from "@angular/forms"
import type { Task } from "@models/task.model"

@Component({
  selector: "app-task-list",
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './task-list.component.html'
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
