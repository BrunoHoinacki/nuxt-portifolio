<template>
    <div>
        Layout Padrao
        <select v-model="locale">
            <option value="pt">pt</option>
            <option value="en">en</option>
        </select>
        <slot />
        Rodape Padrao
    </div>
</template>

<script setup lang="ts">
const { locale } = useI18n();

</script>