import { Anime } from "./Anime";
import { Rodada } from "./Rodada";

export class Jogo {
    animes : Anime[];
    qtdRodadas: number|null = 0;
    rodadas: Rodada[] = [];
    rodadaAtual: Rodada|null = null;
    vencedor: Anime|null|undefined = null;

    constructor(animes: Anime[]) {
        this.animes = animes;
        this.setQtdRodadas();
    }


    private setQtdRodadas() : void{
        const qtdAnimes:number = this.animes.length;
        this.qtdRodadas = qtdAnimes / 2;
    }

    private primeiraRodada(rodada: Rodada){
        this.rodadaAtual = rodada;
        rodada.setId(1);
        const op1:Anime|undefined = this.animes.shift();
        const op2:Anime|undefined = this.animes.shift();
        rodada.setOpcoes([op1, op2])
        this.rodadas.push(rodada);
        return rodada;
    }

    private acabou() {
        // @ts-ignore
        return this.animes.length == 0;
    }

    public novaRodada(): Rodada|null {
        if(this.acabou()){
            this.vencedor = this.rodadaAtual?.getEscolhaAtual();
            return;
        }

        const rodada = new Rodada();
        if(this.rodadaAtual == null){
            return this.primeiraRodada(rodada);
        }


        rodada.setId((this.rodadaAtual.getId() + 1))
        this.rodadaAtual = rodada;
        const rodadaAnterior = this.rodadas[this.rodadas.length - 1];
        const escolhaRodadaAnterior = rodadaAnterior.getEscolhaAtual();
        rodada.setEscolhaAnterior(escolhaRodadaAnterior);
        rodada.setOpcoes([escolhaRodadaAnterior, this.animes.shift()]);
        this.rodadas.push(rodada);
        return rodada;
    }

    public escolhe(escolha: Anime) : boolean {
        this.rodadaAtual.setEscolhaAtual(escolha);
        return true;
    }


}