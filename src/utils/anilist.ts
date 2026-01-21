import axios from "axios";

export const anilist = axios.create({
    baseURL: import.meta.env.VITE_ANILIST_URL,
    timeout: 10000,
});

