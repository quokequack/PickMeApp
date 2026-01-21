import { mal_axios } from '../plugins/mal.ts';

async function getAnimes() {
    return await mal_axios.get(`/anime?q=one&limit=10`);
}

export const malService = {
    getAnimes,
}