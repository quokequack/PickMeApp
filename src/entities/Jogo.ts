import { Anime } from "./Anime";
import { Rodada } from "./Rodada";

export class Jogo {
    animes : Anime[];
    qtdRodadas: null|number = 0;
    rodadas: Rodada[] = [];
    rodadaAtual: null|number = null;

    constructor(animes: Anime[]) {
        this.animes = animes;
        this.setQtdRodadas();
    }


    private setQtdRodadas(){
        const qtdAnimes = this.animes.length;
        this.qtdRodadas = (qtdAnimes - 2) / 2;
    }

    private primeiraRodada(rodada: Rodada){
        this.rodadaAtual = 1;
        rodada.setId(this.rodadaAtual);
        rodada.setOpcoes(this.animes.slice(0, 2))
        this.rodadas.push(rodada);
        return rodada;
    }

    private acabou() {
        return this.qtdRodadas == this.rodadaAtual || this.animes.length == 0;
    }

    public novaRodada(): Rodada|null {

        if(this.acabou()){
            return null;
        }

        const rodada = new Rodada();
        if(this.rodadaAtual == null){
            return this.primeiraRodada(rodada);
        }

        this.rodadaAtual++;
        rodada.setId(this.rodadaAtual);
        const rodadaAnterior = this.rodadas[this.rodadas.length - 1];
        const escolhaRodadaAnterior = rodadaAnterior.getEscolhaAtual();
        rodada.setEscolhaAnterior(escolhaRodadaAnterior);
        rodada.setOpcoes([escolhaRodadaAnterior, this.animes.shift()]);
        this.rodadas.push(rodada);
        return rodada;
    }

    public escolhe(escolha: Anime) : boolean {
        const rodadaAtual = this.rodadas[this.rodadas.length - 1];
        rodadaAtual?.setEscolhaAtual(escolha);
        return true;
    }


}