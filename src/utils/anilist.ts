import axios from "axios";

export const anilist = axios.create({
    baseURL: 'https://graphql.anilist.co',
    timeout: 10000,
});

