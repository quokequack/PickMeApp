import {defineStore} from "pinia";
import {anilistService} from "../services/anilist.service.ts";
import {ref} from "vue";
import Swal from "sweetalert2";
import type {Anime} from "../entities/Anime.ts";

export const useAnimeDataStore = defineStore('animeDataStore', () =>
{
    const lista = ref<Anime[]>();
    const lastFetch = ref<number|null>(null);
    const cacheDuration = 60 * 60 * 1000;

    function initAnime(data: any) {
        lista.value = data;
    }

    async function getAnimes(page = 1) {

        const now = Date.now();
        if(lista.value && lastFetch.value && (now - lastFetch.value) < cacheDuration){
            return;
        }

        try{
            const data = await anilistService.getAnimes(page);
            console.log(data);
            initAnime(data.Page.media);
            lastFetch.value = now;
        } catch (error) {
            console.error(error);
            await Swal.fire({
                icon: 'error',
                title: 'Erro',
                text: `${error}`,
            })
        }
    }

    function embaralhar(){
        // @ts-ignore
        lista.value = lista.value.map((valor) => ({ val: valor, key: Math.random()}))
            .sort((a, b) => a.key - b.key)
            .map((o) => o.val);
    }

    return {
        lista,
        lastFetch,
        getAnimes,
        embaralhar,
    }
}, {persist: true});