<template>
    <div>
        <UModal v-model="isOpen">
            <div class="p-4">
                <UForm :validate="validate" :state="state" class="space-y-4" @submit="onSubmit">
                    <UFormGroup label="descricao" name="descricao">
                        <UInput v-model="state.descricao" />
                    </UFormGroup>
                    <UFormGroup label="url" name="url">
                        <UInput v-model="state.url" type="url" />
                    </UFormGroup>
                    <UButton type="submit"> Enviar </UButton>
                </UForm>
            </div>
        </UModal>
    </div>

    <UCard class="w-[800px] justify-center mx-auto">
        <template #header>
            {{ video.descricao }}
        </template>
        <iframe class="h-[500px] w-full" :src="video.url" title="YouTube video player" frameborder="0" />
        <template #footer>
            <div class="flex justify-between">
                <UButton icon="i-heroicons-pencil-square" size="sm" variant="solid" label="Deletar" :trailing="false"
                    @click="deletarVideo" />
                <UButton icon="i-heroicons-pencil-square" size="sm" color="primary" variant="solid" label="Editar"
                    :trailing="false" @click="abrirModal" />
            </div>

        </template>
    </UCard>

</template>

<script setup lang="ts">
import type { Video } from "~/interfaces/video";
import type { FormError, FormSubmitEvent } from "#ui/types";
const isOpen = ref(false);
const route = useRoute();
const video = ref<Video>({} as Video);
onMounted(async () => {
    video.value = await $fetch(`/api/v1/videos/${route.params.id}`);
});
const router = useRouter();
const { $toast } = useNuxtApp();
const state = reactive({
    id: 0,
    descricao: "",
    url: "",
});
const validate = (state: any): FormError[] => {
    const errors = [];
    if (!state.descricao) errors.push({ path: "descricao", message: "Required" });
    if (!state.url) errors.push({ path: "url", message: "Required" });
    return errors;
};
async function onSubmit(event: FormSubmitEvent<any>) {
    try {
        await $fetch(`/api/v1/videos/${route.params.id}`, {
            method: "PUT",
            body: state,
        });
        router.push("/videos");
        $toast.success("Vídeo atualizado com sucesso!");
        isOpen.value = false;
    } catch (error) {
        $toast.error("Erro ao atualizado o vídeo");
    }
}
const abrirModal = () => {
    state.descricao = video.value.descricao;
    state.url = video.value.url;
    state.id = video.value.id;
    isOpen.value = true;
};
const deletarVideo = async () => {
    try {
        await $fetch(`/api/v1/videos/${route.params.id}`, {
            method: "DELETE",
        });
        router.push("/videos");
        $toast.success("Vídeo deletado com sucesso!");
    } catch (error) {
        $toast.error("Erro ao deletado o vídeo");
    }
};
</script>

<style lang="scss" scoped></style>