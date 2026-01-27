# PickMe

Jogo de eliminatoria onde voce escolhe seu anime favorito entre dois, ate restar apenas um vencedor.

## Stack

- Vue 3 + TypeScript + Vite
- Vuetify 3 (UI)
- Pinia (estado global com cache persistente)
- AniList API (GraphQL)

## Instalacao

```bash
npm install
```

## Executar

```bash
# Desenvolvimento
npm run dev

# Build producao
npm run build

# Preview build
npm run preview
```

## Estrutura

```
src/
├── entities/        # Classes do dominio (Anime, Jogo, Rodada)
├── services/        # Chamadas API (anilist.service.ts)
├── stores/          # Pinia stores (cache de 1h dos animes)
├── views/           # Paginas (Home.vue)
├── plugins/         # Configuracao Vuetify
├── router/          # Rotas
└── utils/           # Axios config
```

## Como funciona

1. Ao iniciar, busca 50 animes mais populares da AniList (com cache de 1 hora)
2. Embaralha a lista
3. Apresenta dois animes por rodada
4. Usuario escolhe o favorito
5. O escolhido avanca para proxima rodada contra um novo anime
6. Repete ate sobrar um vencedor

## API

Usa a [AniList GraphQL API](https://anilist.gitbook.io/anilist-apiv2-docs/) para buscar dados dos animes (titulo, imagem, descricao).
