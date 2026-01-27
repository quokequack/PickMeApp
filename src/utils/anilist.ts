import axios from "axios";

export const anilist = axios.create({
    baseURL: '/anilist-api',
    timeout: 10000,
});

