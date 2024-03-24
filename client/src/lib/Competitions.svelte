<script lang="ts">
    import { onMount } from 'svelte';

    type Competition = {
        id: number;
        area: {
            id: number;
            name: string;
            code: string;
            flag: string;
        };
        name: string;
        code: string;
        type: string;
        emblem: string;
        plan: string;
        currentSeason: {
            id: number;
            startDate: string;
            endDate: string;
            currentMatchDay: number;
            winner: null | {
                id: number;
                name: string;
                shortName: string;
                tla: string;
                crest: string;
                address: string;
                website: string;
                founded: number;
                clubColors: string;
                venue: string | null;
                lastUpdate: Date;
            };
        };
    };

    type Response = Competition[];

    let competitions: Response = [];
    let loading = true;
    const baseURL = import.meta.env.VITE_API_BASE_URL;

    onMount(async () => {
        const res = await fetch(`${baseURL}/competitions/all`);
        competitions = await res.json();
        loading = false;
    });
</script>

<div class="competitions-list-container">
    {#if loading}
        <p>Loading...</p>
    {/if}
    {#each competitions as competition}
        <div class="competition-container">
            <img
                src={competition.emblem}
                alt="{competition.name} emblem"
                class="competition-emblem"
            />
            <p class="competition-name">{competition.name}</p>
        </button>
    {/each}
    {#if !loading && !competitions.length}
        <p>No competitions found.</p>
    {/if}
</div>

<style>
    .competitions-list-container {
        display: flex;
        align-items: flex-start;
        flex-wrap: wrap;
    }

    .competition-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 10rem;
        border: 1px solid #000000;
        border-radius: 1rem;
        padding: 1rem;
        background: none;
        margin-bottom: 1rem;
    }

    .competition-container:hover {
        cursor: pointer;
    }

    .competition-container:not(:last-child) {
        margin-right: 1rem;
    }

    .competition-emblem {
        height: 5rem;
        width: auto;
    }

    .competition-name {
        margin-bottom: 0;
    }
</style>
