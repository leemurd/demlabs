<script lang="ts">
    import { onMount, createEventDispatcher } from 'svelte';
    import { fade } from 'svelte/transition';
    import { browser } from '$app/environment';
    import { db } from '$lib/db';
    import type { Task } from '$lib/types';
    import TaskItem from './TaskItem.svelte';

    const dispatch = createEventDispatcher<{ edit: Task }>();
    export let filter: string = '';
    export let sortOption: 'dateDesc' | 'dateAsc' | 'alphaAsc' | 'alphaDesc' = 'dateDesc';
    export let refreshSignal: number = 0;

    let tasks: Task[] = [];
    let filteredTasks: Task[] = [];
    let sortedTasks: Task[] = [];
    const transitionTime: number = 1000
    let loading: boolean = true;

    async function loadTasks() {
        if (!browser || !db) return;
        tasks = await db.tasks.toArray();
        applyFilter();
        loading = false;
    }

    function applyFilter() {
        const q = filter.trim().toLowerCase();
        filteredTasks = q
            ? tasks.filter(t => t.title.toLowerCase().includes(q))
            : [...tasks];
        applySort();
    }

    function applySort() {
        sortedTasks = [...filteredTasks].sort((a, b) => {
            switch (sortOption) {
                case 'dateAsc':
                    return a.createdAt.getTime() - b.createdAt.getTime();
                case 'dateDesc':
                    return b.createdAt.getTime() - a.createdAt.getTime();
                case 'alphaAsc':
                    return a.title.localeCompare(b.title);
                case 'alphaDesc':
                    return b.title.localeCompare(a.title);
            }
        });
    }

    $: if (browser && refreshSignal) {
        loadTasks();
    }

    $: if (browser && filter !== undefined) {
        applyFilter();
    }

    $: if (browser && sortOption) {
        applySort();
    }

    onMount(loadTasks);
</script>


<div class="space-y-4 p-4">
    {#if loading}
        <p class="text-gray-500 text-center">Loading</p>
    {:else if sortedTasks.length === 0}
        <p class="text-gray-500 text-center">Нет задач</p>
    {:else}
        {#each sortedTasks as task (task.id)}
            <div in:fade={{ duration: transitionTime }} out:fade={{ duration: transitionTime }} class="space-y-2">
                <TaskItem
                        {task}
                        on:update={loadTasks}
                        on:edit={e => dispatch('edit', e.detail)}
                />
            </div>
        {/each}
    {/if}
</div>
