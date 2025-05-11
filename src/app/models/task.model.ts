export interface Task {
  id: string
  title: string
  description: string
  status: "pending" | "inProgress" | "completed"
  createdAt: string
  userId: string
}
