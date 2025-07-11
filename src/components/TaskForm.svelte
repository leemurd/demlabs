<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import type { Task } from '$lib/types';
  import { db } from '$lib/db';

  const dispatch = createEventDispatcher<{ save: void }>();
  export let task: Task | null = null;

  let id: number | undefined;
  let title = '';
  let description = '';
  let status: 'active' | 'done' = 'active';
  let isEditing = false;

  $: if (task) {
    id = task.id;
    title = task.title;
    description = task.description ?? '';
    status = task.status;
    isEditing = true;
  } else {
    id = undefined;
    title = '';
    description = '';
    status = 'active';
    isEditing = false;
  }

  async function handleSubmit() {
    const trimmedTitle = title.trim();
    if (!trimmedTitle) return;

    const newTask: Task = {
      id,
      title: trimmedTitle,
      description: description.trim(),
      status,
      createdAt: task?.createdAt ?? new Date()
    };

    if (isEditing && id != null) {
      await db.tasks.update(id, newTask);
    } else {
      await db.tasks.add({ ...newTask, createdAt: new Date() });
    }

    dispatch('save');

    title = '';
    description = '';
    status = 'active';
    id = undefined;
    isEditing = false;
  }
</script>

<form on:submit|preventDefault={handleSubmit} class="flex flex-col gap-4 p-4 bg-white rounded-lg shadow-md">
  <input
          type="text"
          bind:value={title}
          placeholder="Заголовок задачи"
          required
          class="p-2 border border-gray-300 rounded"
  />

  <textarea
          bind:value={description}
          placeholder="Описание (опционально)"
          rows={3}
          class="p-2 border border-gray-300 rounded"
  ></textarea>

  <button
          type="submit"
          class="self-end px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 cursor-pointer"
  >
    {isEditing ? 'Сохранить' : 'Добавить'}
  </button>
</form>