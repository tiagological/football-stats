import Competitions from './lib/Competitions.svelte';
import Standings from './lib/Standings.svelte';
import NotFound from './lib/NotFound.svelte';

export const routes = {
    '/': Competitions,
    '/standings/:id': Standings,
    '*': NotFound,
};
