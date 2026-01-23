<script setup lang="ts">
import { useAnime } from '../composables/Anime.ts';
import {onMounted, ref} from "vue";
import {Jogo} from "../entities/Jogo.ts";

const dadosCarregados = ref(false);
const animeComposable = new useAnime();
const animes = ref({});
const jogo = ref(null);
const fim = ref(false);

function comecarJogo() {
  jogo.value = new Jogo(animes.value);
  novaRodada();

}

function escolher(opcao){
  jogo.value.escolhe(opcao);
  this.novaRodada();

}

function novaRodada(){
  if(jogo.value != null){
    if(jogo.value.vencedor != null){
      fim.value = true;
      return jogo.value.vencedor;
    }
    return jogo.value.novaRodada();
  }
}

function recomecar(){
  window.location.reload();
}


onMounted(async () => {
  await animeComposable.getAnimes();
  animeComposable.embaralhar();
  animes.value = animeComposable.lista;
  dadosCarregados.value = true;
})

</script>

<template>
  <h1>pickme</h1>
  <v-container v-if="dadosCarregados">
    <v-row v-if="jogo == null">
      <v-btn @click="comecarJogo"> COMEÇAR </v-btn>
    </v-row>

    <div v-if="jogo !== null">
      <v-row v-if="fim == false">
        <v-col cols="12" md="12">
          <h2> Rodada {{ jogo.rodadaAtual.id }}</h2>
        </v-col>
        <v-col cols="12" md="6" v-for="opcao in jogo.rodadaAtual.opcoes">
          <v-card
              @click="escolher(opcao)"
              class="mx-auto my-12 card"
              max-width="374"
              max-height="600">

            <v-img :src="opcao.coverImage.extraLarge"></v-img>

            <v-card-title> {{ opcao.title.romaji }} </v-card-title>
            <v-card-text>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </div>

    <div v-if="fim">
      <h2> Vencedor {{ jogo.vencedor.title.romaji }}</h2>
      <v-row>
        <v-col cols="12" md="6">
          <v-card
              class="mx-auto my-12 card"
              max-width="374"
              max-height="600">
            <v-img
                :src="jogo.vencedor.coverImage.extraLarge"
                height="200px"></v-img>
          </v-card>
        </v-col>
      </v-row>
      <v-btn @click="recomecar"> Recomeçar </v-btn>
    </div>
  </v-container>
</template>

<style scoped>
.card:hover {
  height: 130%;
  width: 130%;
}
</style>