<script setup lang="ts">
import {onMounted, ref} from "vue";
import {Jogo} from "../entities/Jogo.ts";
import {useAnimeDataStore} from "../stores/useAnimeDataStore.ts";
import type { Anime } from "../entities/Anime.ts";

const dadosCarregados = ref<boolean>(false);
const animeComposable = useAnimeDataStore();
const animes = ref<Anime[]>([]);
const jogo = ref<Jogo|null>(null);
const fim = ref<boolean>(false);
const expandedCards = ref<Record<number, boolean>>({});

function toggleDescription(event: Event, animeId: number) {
  event.stopPropagation();
  expandedCards.value[animeId] = !expandedCards.value[animeId];
}

function comecarJogo() {
  jogo.value = new Jogo(animes.value);
  novaRodada();

}

function escolher(opcao: Anime){
  // @ts-ignore
  jogo.value.escolhe(opcao);
  novaRodada();

}

function novaRodada(){
  if(jogo.value != null){
    jogo.value.novaRodada();
    if(jogo.value.vencedor != null){
      fim.value = true;
    }
  }
}

function recomecar(){
  window.location.reload();
}


onMounted(async () => {
  await animeComposable.getAnimes();
  animeComposable.embaralhar();
  // @ts-ignore
  animes.value = animeComposable.lista;
  dadosCarregados.value = true;
})

</script>

<template>
  <div v-if="!dadosCarregados" class="loading-screen">
    <div class="loading-content">
      <div class="loading-spinner"></div>
      <p class="loading-text">Carregando animes...</p>
    </div>
  </div>

  <div v-else class="game-container">
    <div v-if="jogo == null" class="start-screen">
      <div class="logo-container">
        <h1 class="game-title">
          <span class="title-pick">PICK</span>
          <span class="title-me">ME</span>
        </h1>
        <p class="game-subtitle">Escolha seu anime favorito</p>
      </div>
      <button class="start-btn" @click="comecarJogo">
        <span class="btn-text">INICIAR</span>
        <span class="btn-icon">&#9658;</span>
      </button>
      <div class="decorative-lines"></div>
    </div>

    <div v-if="jogo !== null && !fim" class="battle-screen">
      <div class="round-header">
        <div class="round-badge">
          <span class="round-label">RODADA</span>
          <span class="round-number">{{ jogo.rodadaAtual?.getId() }}</span>
        </div>
        <p class="round-instruction">Escolha seu favorito!</p>
      </div>

      <div class="battle-arena">
        <div
          v-for="(opcao, index) in jogo.rodadaAtual?.getOpcoes()"
          :key="opcao.id"
          class="anime-card"
          :class="{ 'card-left': index === 0, 'card-right': index === 1 }"
          @click="escolher(opcao)">
          <div class="card-glow"></div>
          <div class="card-inner">
            <div class="card-image-container">
              <img :src="opcao.coverImage.extraLarge" :alt="opcao.title.romaji" class="card-image" />
              <div class="card-overlay"></div>
            </div>
            <div class="card-info">
              <h3 class="card-title">{{ opcao.title.romaji }}</h3>
              <p v-if="opcao.title.english" class="card-subtitle">{{ opcao.title.english }}</p>
            </div>
            <v-card-actions class="card-actions">
              <v-spacer></v-spacer>
              <v-btn
                  :icon="expandedCards[opcao.id] ? 'mdi-chevron-up' : 'mdi-chevron-down'"
                  variant="text"
                  color="white"
                  @click="toggleDescription($event, opcao.id)">
              </v-btn>
            </v-card-actions>

            <v-expand-transition>
              <div v-show="expandedCards[opcao.id]" class="description-container">
                <v-divider class="divider"></v-divider>
                <div class="description-text">
                  {{ opcao.description }}
                </div>
              </div>
            </v-expand-transition>
          </div>
        </div>

        <div class="vs-badge">
          <span>VS</span>
        </div>
      </div>
    </div>

    <div v-if="fim" class="winner-screen">
      <div class="winner-content">
        <div class="winner-badge">
          <span class="crown">&#9733;</span>
          <span class="winner-text">VENCEDOR</span>
          <span class="crown">&#9733;</span>
        </div>

        <div class="winner-card">
          <div class="winner-glow"></div>
          <img :src="jogo?.vencedor?.coverImage?.extraLarge" :alt="jogo?.vencedor?.title?.romaji" class="winner-image" />
          <div class="winner-info">
            <h2 class="winner-title">{{ jogo?.vencedor?.title?.romaji }}</h2>
            <p v-if="jogo?.vencedor?.title?.english" class="winner-subtitle">{{ jogo?.vencedor?.title?.english }}</p>
          </div>
        </div>

        <button class="restart-btn" @click="recomecar">
          <span>JOGAR NOVAMENTE</span>
        </button>
      </div>
      <div class="confetti"></div>
    </div>
  </div>
</template>

<style scoped>
.loading-screen {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 80vh;
  width: 100%;
}

.loading-content {
  text-align: center;
}

.loading-spinner {
  width: 60px;
  height: 60px;
  border: 4px solid rgba(255, 107, 157, 0.2);
  border-top-color: #ff6b9d;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: 0 auto 20px;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.loading-text {
  color: #fff;
  font-size: 1.2rem;
  opacity: 0.8;
  animation: pulse 1.5s ease-in-out infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 0.5; }
  50% { opacity: 1; }
}

.game-container {
  width: 100%;
  max-width: 1200px;
  position: relative;
  z-index: 1;
}

.start-screen {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 70vh;
  text-align: center;
  animation: fadeIn 0.8s ease-out;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

.logo-container {
  margin-bottom: 50px;
}

.game-title {
  font-size: 5rem;
  font-weight: 800;
  letter-spacing: 8px;
  margin: 0;
  line-height: 1;
}

.title-pick {
  color: #fff;
  text-shadow:
    0 0 10px rgba(255, 255, 255, 0.5),
    0 0 20px rgba(255, 107, 157, 0.5),
    0 0 40px rgba(255, 107, 157, 0.3);
}

.title-me {
  background: linear-gradient(135deg, #ff6b9d 0%, #c44569 50%, #ff6b9d 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  filter: drop-shadow(0 0 20px rgba(255, 107, 157, 0.5));
}

.game-subtitle {
  color: rgba(255, 255, 255, 0.7);
  font-size: 1.3rem;
  margin-top: 15px;
  letter-spacing: 3px;
  text-transform: uppercase;
}

.start-btn {
  display: flex;
  align-items: center;
  gap: 15px;
  padding: 20px 50px;
  font-size: 1.4rem;
  font-weight: 600;
  letter-spacing: 4px;
  color: #fff;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border: none;
  border-radius: 50px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow:
    0 10px 30px rgba(102, 126, 234, 0.4),
    0 0 0 0 rgba(102, 126, 234, 0.4);
  position: relative;
  overflow: hidden;
}

.start-btn::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
  transition: left 0.5s ease;
}

.start-btn:hover {
  transform: translateY(-3px) scale(1.02);
  box-shadow:
    0 15px 40px rgba(102, 126, 234, 0.5),
    0 0 0 3px rgba(255, 255, 255, 0.1);
}

.start-btn:hover::before {
  left: 100%;
}

.btn-icon {
  font-size: 1rem;
  transition: transform 0.3s ease;
}

.start-btn:hover .btn-icon {
  transform: translateX(5px);
}

/* Battle Screen */
.battle-screen {
  animation: fadeIn 0.5s ease-out;
}

.round-header {
  text-align: center;
  margin-bottom: 40px;
}

.round-badge {
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  background: linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%);
  padding: 15px 40px;
  border-radius: 20px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
}

.round-label {
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.6);
  letter-spacing: 4px;
  text-transform: uppercase;
}

.round-number {
  font-size: 2.5rem;
  font-weight: 800;
  background: linear-gradient(135deg, #ff6b9d 0%, #ffd93d 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.round-instruction {
  color: rgba(255, 255, 255, 0.7);
  margin-top: 15px;
  font-size: 1.1rem;
  letter-spacing: 1px;
}

.battle-arena {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 30px;
  flex-wrap: wrap;
  position: relative;
}

.anime-card {
  position: relative;
  width: 320px;
  min-height: 520px;
  cursor: pointer;
  transition: transform 0.3s ease, z-index 0s;
}

.anime-card:hover {
  transform: translateY(-10px);
  z-index: 10;
}

.card-glow {
  position: absolute;
  top: -3px;
  left: -3px;
  right: -3px;
  bottom: -3px;
  background: linear-gradient(135deg, #ff6b9d, #667eea, #764ba2, #ff6b9d);
  background-size: 300% 300%;
  border-radius: 20px;
  opacity: 0;
  transition: opacity 0.3s ease;
  animation: gradientShift 3s ease infinite;
  z-index: -1;
  pointer-events: none;
}

@keyframes gradientShift {
  0%, 100% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
}

.anime-card:hover .card-glow {
  opacity: 1;
}

.card-inner {
  background: linear-gradient(145deg, #1a1a2e 0%, #16213e 100%);
  border-radius: 18px;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.1);
  height: 100%;
  display: flex;
  flex-direction: column;
}

.card-image-container {
  position: relative;
  flex: 1;
  min-height: 380px;
  overflow: hidden;
}

.card-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.card-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to top, rgba(26, 26, 46, 1) 0%, transparent 50%);
}

.card-info {
  padding: 20px;
  position: relative;
  margin-top: -60px;
  z-index: 2;
  min-height: 100px;
}

.card-title {
  color: #fff;
  font-size: 1.2rem;
  font-weight: 700;
  margin: 0 0 5px 0;
  line-height: 1.3;
}

.card-subtitle {
  color: rgba(255, 255, 255, 0.5);
  font-size: 0.9rem;
  margin: 0;
}

.card-actions {
  padding: 0 12px 8px;
  margin-top: -8px;
}

.description-container {
  padding: 0 16px 16px;
}

.divider {
  border-color: rgba(255, 255, 255, 0.1);
  margin-bottom: 12px;
}

.description-text {
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.85rem;
  line-height: 1.5;
  max-height: 150px;
  overflow-y: auto;
}

.vs-badge {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 70px;
  height: 70px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #ff6b9d 0%, #c44569 100%);
  border-radius: 50%;
  font-size: 1.5rem;
  font-weight: 800;
  color: #fff;
  box-shadow: 0 0 30px rgba(255, 107, 157, 0.5);
  z-index: 20;
  animation: vsPulse 2s ease-in-out infinite;
}

@keyframes vsPulse {
  0%, 100% { transform: translate(-50%, -50%) scale(1); }
  50% { transform: translate(-50%, -50%) scale(1.1); }
}

.winner-screen {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 70vh;
  animation: fadeIn 0.8s ease-out;
  position: relative;
}

.winner-content {
  text-align: center;
  z-index: 2;
}

.winner-badge {
  display: inline-flex;
  align-items: center;
  gap: 15px;
  margin-bottom: 30px;
}

.crown {
  font-size: 2rem;
  color: #ffd93d;
  animation: starPulse 1s ease-in-out infinite;
}

@keyframes starPulse {
  0%, 100% { transform: scale(1) rotate(0deg); }
  50% { transform: scale(1.2) rotate(10deg); }
}

.winner-text {
  font-size: 2rem;
  font-weight: 800;
  letter-spacing: 8px;
  background: linear-gradient(135deg, #ffd93d 0%, #ff6b9d 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.winner-card {
  position: relative;
  width: 350px;
  margin: 0 auto 40px;
  border-radius: 20px;
  overflow: hidden;
  background: linear-gradient(145deg, #1a1a2e 0%, #16213e 100%);
  border: 2px solid rgba(255, 217, 61, 0.3);
}

.winner-glow {
  position: absolute;
  inset: -4px;
  background: linear-gradient(135deg, #ffd93d, #ff6b9d, #667eea, #ffd93d);
  background-size: 300% 300%;
  border-radius: 22px;
  animation: gradientShift 2s ease infinite;
  z-index: -1;
}

.winner-image {
  width: 100%;
  height: 450px;
  object-fit: cover;
}

.winner-info {
  padding: 25px;
  background: linear-gradient(to top, rgba(26, 26, 46, 1) 0%, rgba(26, 26, 46, 0.9) 100%);
  margin-top: -80px;
  position: relative;
}

.winner-title {
  color: #fff;
  font-size: 1.5rem;
  font-weight: 700;
  margin: 0 0 8px 0;
}

.winner-subtitle {
  color: rgba(255, 255, 255, 0.6);
  font-size: 1rem;
  margin: 0;
}

.restart-btn {
  padding: 18px 45px;
  font-size: 1.1rem;
  font-weight: 600;
  letter-spacing: 3px;
  color: #fff;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border: none;
  border-radius: 50px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 10px 30px rgba(102, 126, 234, 0.4);
}

.restart-btn:hover {
  transform: translateY(-3px);
  box-shadow: 0 15px 40px rgba(102, 126, 234, 0.5);
}

@media (max-width: 768px) {
  .game-title {
    font-size: 3rem;
    letter-spacing: 4px;
  }

  .game-subtitle {
    font-size: 1rem;
  }

  .anime-card {
    width: 280px;
    min-height: 480px;
  }

  .card-image-container {
    min-height: 340px;
  }

  .vs-badge {
    position: relative;
    left: auto;
    top: auto;
    transform: none;
    margin: 20px 0;
  }

  .battle-arena {
    flex-direction: column;
  }
}
</style>