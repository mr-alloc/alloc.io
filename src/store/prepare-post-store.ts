import {defineStore} from "pinia"

export const usePagePrepareStore = defineStore('preparePostStatus', () => {
    const isPrepare = ref(true)

    function prepare() {
        isPrepare.value = true
    }
    function done() {
        isPrepare.value = false
    }

    return { isPrepare, prepare, done }
})
