<template>
    <div>
        Você está no video: {{ idParams }}
    </div>
    <VideoDetalhes />
    <VideoControlePlay />
</template>

<script setup>
definePageMeta({
    layout: 'exibicao',
    middleware: ['video', 'auth'],
})

const route = useRoute();

const idParams = computed(() => route.params.id);
</script>

<style lang="scss" scoped></style>