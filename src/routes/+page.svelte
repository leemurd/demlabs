<script lang="ts">
    import TaskForm from '../components/TaskForm.svelte';
    import SearchBar from '../components/SearchBar.svelte';
    import TaskList from '../components/TaskList.svelte';
    import type { Task } from '$lib/types';

    let refreshSignal = 0;
    let filter = '';
    let sortOption: 'dateDesc' | 'dateAsc' | 'alphaAsc' | 'alphaDesc' = 'dateDesc';
    let selectedTask: Task | null = null;

    function handleSave() {
        refreshSignal += 1;
        selectedTask = null;
    }

    function handleEdit(e: CustomEvent<Task>) {
        selectedTask = e.detail;
    }

    function handleSearch(e: CustomEvent<{ search: string }>) {
        filter = e.detail.search;
    }
</script>

<main class="max-w-2xl mx-auto p-6 space-y-8">
    <h1 class="text-3xl font-semibold text-gray-800 text-center">Список задач</h1>

    <section class="bg-white shadow rounded-lg">
        <TaskForm task={selectedTask} on:save={handleSave} />
    </section>

    <section class="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <SearchBar on:search={handleSearch} />
        <div class="flex items-center space-x-2">
            <label for="sort" class="text-gray-700">Сортировать:</label>
            <select
                    id="sort"
                    bind:value={sortOption}
                    class="p-2 border border-gray-300 rounded"
            >
                <option value="dateDesc">По дате: новые сверху</option>
                <option value="dateAsc">По дате: старые сверху</option>
                <option value="alphaAsc">По алфавиту A→Z</option>
                <option value="alphaDesc">По алфавиту Z→A</option>
            </select>
        </div>
    </section>

    <section class="bg-white shadow rounded-lg">
        <TaskList
                {filter}
                {sortOption}
                refreshSignal={refreshSignal}
                on:edit={handleEdit}
        />
    </section>
</main>