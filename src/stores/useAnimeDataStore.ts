import {defineStore} from "pinia";
import {anilistService} from "../services/anilist.service.ts";
import {ref} from "vue";
import Swal from "sweetalert2";
import type {Anime} from "../entities/Anime.ts";

export const useAnimeDataStore = defineStore('animeDataStore', () =>
{
    const lista = ref<Anime[]>();

    function initAnime(data: any) {
        lista.value = data;
    }

    async function getAnimes(page = 1) {

        try{
            const data = await anilistService.getAnimes(page);
            initAnime(data.Page.media);
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
        getAnimes,
        embaralhar,
    }
}, {persist: true});