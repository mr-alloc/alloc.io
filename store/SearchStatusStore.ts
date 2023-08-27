import {defineStore} from "pinia";

export const useSearchStatusStore = defineStore('searchStatus', () => {
    const isSearchMode = ref(false)

    function searching() {
        isSearchMode.value = true;
        document.body.style.overflow = 'hidden'
    }

    function cancelSearch() {
        isSearchMode.value = false
        document.body.style.overflow = 'unset'
    }

    return {
        isSearchMode, searching, cancelSearch: cancelSearch
    }
})
