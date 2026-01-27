<script setup lang="ts">
</script>

<template>
  <v-app>
    <v-main>
      <div id="app">
        <router-view />
      </div>
    </v-main>
  </v-app>
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;600;800&display=swap');

* {
  box-sizing: border-box;
}

#app {
  min-height: 100vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0;
  padding: 20px;
  background: linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%);
  background-attachment: fixed;
  font-family: 'Outfit', sans-serif;
  position: relative;
  overflow-x: hidden;
}

#app::before {
  content: '';
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;

  pointer-events: none;
  z-index: 0;
}

</style>
