<template>
  <h1 class="text-5xl text-center mb-4">{{ $t("titulo") }}</h1>
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-center justify-center gap-4">
    <UCard v-for="video in videos" :key="video.id">
      <template #header>
        {{ video.descrição }}
      </template>
      <iframe class="w-full h-48" :src="video.url" title="YouTube video player" frameborder="0" />
      <template #footer>
        <div class="flex justify-between">
          <UButton @click="favoritar(video)">
            {{ $t("textoBotaoFavorito") }}
          </UButton>
          <NuxtLink :to="{
            name: 'videos-id',
            params: { id: video.id.toString() },
          }">
            <UButton label="Ver video" color="gray">
              <template #trailing>
                <UIcon name="i-heroicons-arrow-right-20-solid" class="w-5 h-5" />
              </template>
            </UButton>
          </NuxtLink>
        </div>
      </template>
    </UCard>
  </div>
</template>

<script setup lang="ts">
const { $toast } = useNuxtApp();

const { locale } = useI18n();

import type { Video } from "@/interfaces/video";

import { useVideoStore } from '~/store/video';

const { adicionarFavorito } = useVideoStore();

const videos = ref<Video[]>([]);

const favoritar = (video: Video) => {
  adicionarFavorito(video);
  $toast.success("Video adicionado aos favoritos");
}

onMounted(async () => {
  videos.value = await $fetch("/api/v1/videos");
});
</script>

<style scoped></style>