import {anilistService} from "../services/anilist.service.ts";
import Swal from "sweetalert2";

export class useAnime implements IAnime{
    lista : IAnime[];

    async getAnimes(page = 1) {
        try{
            const data = await anilistService.getAnimes(page);
            this.lista = data.Page.media;
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