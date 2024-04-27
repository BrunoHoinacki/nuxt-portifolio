<script setup lang="ts">
const {diasPassados, diferencaEmDias} = useFormatacao()

const dataVideo = new Date(2023, 3, 27);

diasPassados(dataVideo)

</script>

<template>
    <div>
        <h1>Components -nuxt3</h1>
        <p>Bruno Hoinacki</p>
        <p>{{ diferencaEmDias }} dias atrás</p>
    </div>
</template>
