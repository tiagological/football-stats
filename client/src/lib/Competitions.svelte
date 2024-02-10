<script lang="ts">
  import {onMount} from 'svelte';

  type Competition = {
    id: number;
    area: {
      id: number;
      name: string;
      code: string;
      flag: string;
    }
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
      }
    }
  }

  type Response = Competition[]

  let competitions: Response = []
  const baseURL = import.meta.env.VITE_API_BASE_URL;

  onMount(async () => {
    const res = await fetch(`${baseURL}/competitions/all`);
    competitions = await res.json();
  })
</script>

<div>
    {#each competitions as competition}
    <p>{competition.name}</p>
    {:else}
    <p>No competitions</p>
  {/each}
</div>



