import {defineStore} from "pinia";

export const useSearchStatusStore = defineStore('searchStatus', () => {
    const isSearchMode = ref(false)

    function searching() {
        isSearchMode.value = true;
    }

    function cancelSearch() {
        isSearchMode.value = false
    }

    return {
        isSearchMode, searching, cancelSearch: cancelSearch
    }
})
