<script setup lang="ts">
import {Animes} from "../composables/animes.ts";
import {onMounted, ref} from "vue";

const animes = new Animes();

</script>

<template>
  <h1>pickme</h1>
  <v-row>
    <v-col cols="12" md="4" v-for="anime in animes.lista" :key="anime.node.id">
      <v-card
          class="mx-auto"
          max-width="400">
        <v-img
            class="align-end text-white"
            height="200"
            :src="anime.node.main_picture.medium"
            cover>
          <v-card-title>{{ anime.node.title }}</v-card-title>
        </v-img>
      </v-card>
    </v-col>
  </v-row>
</template>

<style scoped>

</style>