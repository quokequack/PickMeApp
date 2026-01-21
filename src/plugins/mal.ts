import axios from "axios";

export const mal_axios = axios.create({
    baseURL: '/mal-api',
    timeout: 10000,
    headers: { 'X-MAL-CLIENT-ID': import.meta.env.VITE_MAL_CLIENT_ID}
});

