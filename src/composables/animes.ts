import {malService} from "../services/mal.service.ts";

export class Animes {
    public lista: {} = {};

    constructor() {
        this.getAnimes();
    }

    async getAnimes() {
        const response = await malService.getAnimes();
        this.lista = response.data.data;

    }
}

