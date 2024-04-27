<template>
  <div>Vídeos Favoritos</div>
  <NuxtLink to="/videos">Voltar</NuxtLink>
  <h1>{{ $t("tituloFavorito") }}</h1>
  <div class="videos">
    <div v-for="video in favoritos" :key="video.id">
      <h2>{{ video.descrição }}</h2>
      <iframe width="550" height="400" :src="video.url" title="YouTube video player" frameborder="0" />

      <div>
        <button @click="RemoverFavorito(video.id)">
          Remover Favorito
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useVideoStore } from '~/store/video';

// const favoritos = useFavoritos();

const { $toast } = useNuxtApp();

const videoStore = useVideoStore();

const { favoritos } = storeToRefs(videoStore);

const RemoverFavorito = (id: number) => {
  videoStore.deletarFavorito(id);
  $toast.error('Video removido dos favoritos');
};
</script>