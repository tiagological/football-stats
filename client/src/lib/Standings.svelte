<script lang="ts">
    import { onMount } from 'svelte';

    type Params = {
        id?: string;
    };
    export let params: Params = {};

    let standings: unknown = null;
    let loading = true;
    const baseURL = import.meta.env.VITE_API_BASE_URL;

    onMount(async () => {
        if (params.id) {
            const res = await fetch(
                `${baseURL}/competitions/standings?id=${params.id}`
            );
            standings = await res.json();
            loading = false;
        } else {
            loading = false;
        }
    });
</script>

{#if loading}
    <p>Loading...</p>
{/if}
{#if !loading && !standings}
    <p>No standings found.</p>
{/if}
