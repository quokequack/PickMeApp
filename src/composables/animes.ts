import {anilistService} from "../services/anilist.service.ts";

export class Animes {

    async getAnimes(page = 1) {
        const data = await anilistService.getAnimes(page);
        return data.Page.media;

    }
}

