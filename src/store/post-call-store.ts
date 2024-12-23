import {defineStore} from "pinia";

export const usePostCallStore = defineStore('PostCall', () => {

    const isCall = ref<boolean>(false);

    function call() {
        isCall.value = true;
    }

    function off() {
        isCall.value = false;
    }

    return {
        isCall,
        call,
        off
    }
})
