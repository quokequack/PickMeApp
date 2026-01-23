<script setup lang="ts">
import { useAnime } from '../composables/Anime.ts';
import {onMounted, ref} from "vue";
import {Jogo} from "../entities/Jogo.ts";

const dadosCarregados = ref(false);
const animeComposable = new useAnime();
const animes = ref({});


function comecarJogo() {
  const jogo = new Jogo();
  console.log(jogo);
}


onMounted(async () => {
  await animeComposable.getAnimes();
  animes.value = animeComposable.lista;
  dadosCarregados.value = true;
})

</script>

<template>
  <h1>pickme</h1>
  <v-row v-if="dadosCarregados">
    <v-btn @click="comecarJogo"> COMEÇAR </v-btn>
  </v-row>
</template>

<style scoped>

</style>