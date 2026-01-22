import {anilistService} from "../services/anilist.service.ts";
import Anime from '../composables/Anime.ts';
import * as Swal from "sweetalert2";

export class Animes {
    animes: Anime[];

    async getAnimes(page = 1) {
        try{
            const data = await anilistService.getAnimes(page);
            this.animes = data.Page.media;
        } catch (error) {
            console.error(error);
            await Swal.fire({
                icon: 'error',
                title: 'Erro',
                text: `${error}`,
            })
        }
    }

}

