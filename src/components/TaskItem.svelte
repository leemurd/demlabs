<script lang="ts">
    import { createEventDispatcher } from 'svelte'
    import type { Task } from '$lib/types'
    import { db } from '$lib/db'

    const dispatch = createEventDispatcher<{ update: void; edit: Task }>()
    export let task: Task

    async function toggleStatus() {
        if (task.id != null) {
            await db.tasks.update(task.id, { status: task.status === 'active' ? 'done' : 'active' })
            dispatch('update')
        }
    }

    async function deleteTask() {
        if (task.id != null) {
            await db?.tasks.delete(task.id)
            dispatch('update')
        }
    }

    function editTask() {
        dispatch('edit', task)
    }
</script>

<div class="flex items-center justify-between p-4 bg-white rounded-lg shadow">
    <div class="flex items-start gap-3">
        <input
                type="checkbox"
                checked={task.status === 'done'}
                on:change={toggleStatus}
                class="form-checkbox mt-1"
        />
        <div class="flex flex-col">
      <span class={task.status === 'done' ? 'line-through text-gray-500' : ''}>
        {task.title}
      </span>
            {#if task.description}
                <small class="text-gray-400">{task.description}</small>
            {/if}
        </div>
    </div>
    <div class="flex gap-2">
        <button on:click={editTask} class="text-blue-500 hover:text-blue-700 cursor-pointer">
            Редактировать
        </button>
        <button on:click={deleteTask} class="text-red-500 hover:text-red-700 cursor-pointer">
            Удалить
        </button>
    </div>
</div>