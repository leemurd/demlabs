export interface Task {
    id?: number
    title: string
    description?: string
    status: 'active' | 'done'
    createdAt: Date
}