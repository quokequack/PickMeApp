<script setup lang="ts">
import {Animes} from "../composables/animes.ts";
import {onMounted, ref} from "vue";

const composableAnimes = new Animes();
const dadosCarregados = ref(false);
const animes = ref({});

onMounted(async () => {
  await composableAnimes.getAnimes();
  animes.value = composableAnimes.animes;
  dadosCarregados.value = true;
})

</script>

<template>
  <h1>pickme</h1>
  <v-row v-if="dadosCarregados">
    <v-col cols="12" md="4" v-for="anime in animes" :key="anime.id">
      <v-card
          class="mx-auto"
          max-width="400">
        <v-img
            class="align-end text-white"
            height="200"
            :src="anime.coverImage.extraLarge"
            cover>
          <v-card-title>{{ anime.title.romaji }}</v-card-title>
        </v-img>
      </v-card>
    </v-col>
  </v-row>
</template>

<style scoped>

</style>