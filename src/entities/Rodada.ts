import { Anime } from "./Anime";

export class Rodada {
    private id: number = 0;
    private escolhaAnterior: null|Anime = null;
    private opcoes: null|Anime[] = null;
    private escolhaAtual: null|Anime = null;


    public setOpcoes(opcoes: Anime[]) {
        this.opcoes = opcoes;
    }

    public setEscolhaAnterior(escolhaAnterior:Anime) {
        this.escolhaAnterior = escolhaAnterior;
    }

    public setId(id:number) {
        this.id = id;
    }

    public setEscolhaAtual(anime:Anime) {
        this.escolhaAtual = anime;
    }

    public getEscolhaAtual() {
        return this.escolhaAtual;
    }


}