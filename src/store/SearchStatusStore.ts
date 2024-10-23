import {defineStore} from "pinia";

export const useSearchStatusStore = defineStore('searchStatus', () => {
    const isSearchMode = ref(false);
    const inputValue = ref('');

    function searching() {
        isSearchMode.value = true;
        inputValue.value = '';
        const html = document.querySelector('html')!;
        html.style.overflow = 'hidden';
        document.body.style.overflow = 'hidden';
    }

    function cancelSearch() {
        isSearchMode.value = false
        inputValue.value = '';
        const html = document.querySelector('html')!
        html.style.overflow = 'unset'
        document.body.style.overflow = 'unset'
    }

    return {
        isSearchMode,
        searching,
        cancelSearch,
        inputValue
    }
})
