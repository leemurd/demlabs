<script lang="ts">
    import { createEventDispatcher } from 'svelte';

    const dispatch = createEventDispatcher<{ search: string }>();
    let query = '';

    function handleInput() {
        dispatch('search', { search: query });
    }
</script>

<input
        type="text"
        bind:value={query}
        on:input={handleInput}
        placeholder="Поиск задач"
        class="w-full p-2 border border-gray-300 rounded"
/>