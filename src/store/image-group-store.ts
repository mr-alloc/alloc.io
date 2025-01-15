import {defineStore} from "pinia";
import type Image from "@/classes/implement/image";

export const useImageGroupStore = defineStore('image-group', () => {

    const imageGroups = ref<Map<string, Array<Image>>>(new Map<string, Array<Image>>());

    const addImage = (groupIndex: number, image: Image) => {
        if (imageGroups.value.has(`${useRoute().path}:${groupIndex}`)) {
            imageGroups.value.get(`${useRoute().path}:${groupIndex}`)?.push(image);
        }

        imageGroups.value.set(`${useRoute().path}:${groupIndex}`, [image]);
    }

    const getImageGroup = (groupIndex: number) => {
        return imageGroups.value.get(`${useRoute().path}:${groupIndex}`);
    }

    return {
        addImage,
        getImageGroup
    }
});
