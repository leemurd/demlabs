import Dexie from 'dexie'
import { browser } from '$app/environment'

export interface Task {
    id?: number
    title: string
    description?: string
    status: 'active' | 'done'
    createdAt: Date
}

export class TaskDB extends Dexie {
    tasks: Dexie.Table<Task, number>

    constructor() {
        super('todoAppDB')
        this.version(1).stores({
            tasks: '++id, title, status, createdAt'
    })
        this.tasks = this.table('tasks')
    }
}

export const db = browser ? new TaskDB() : null