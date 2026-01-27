import { Anime } from "./Anime";

export class Rodada {
    private id: number = 0;
    private escolhaAnterior: Anime|null = null;
    private opcoes: Anime[]|null = null;
    private escolhaAtual: Anime|null = null;


    public setOpcoes(opcoes: Anime[]) {
        this.opcoes = opcoes;
    }

    public setEscolhaAnterior(escolha:Anime) {
        this.escolhaAnterior = escolha;
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

    public getId() {
        return this.id;
    }

    public getOpcoes() {
        return this.opcoes;
    }

    public getEscolhaAnterior() {
        return this.escolhaAnterior;
    }


}