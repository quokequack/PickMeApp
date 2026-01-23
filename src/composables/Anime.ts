import {anilistService} from "../services/anilist.service.ts";
import Swal from "sweetalert2";

export class useAnime implements IAnime{
    lista : Anime[];

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

    embaralhar(){
        this.lista = this.lista.map((valor) => ({ val: valor, key: Math.random()}))
            .sort((a, b) => a.key - b.key)
            .map((o) => o.val);
    }
}