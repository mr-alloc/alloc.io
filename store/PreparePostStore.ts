import {defineStore} from "pinia"

export const usePagePrepareStore = defineStore('preparePostStatus', () => {
    const preparePost = ref(true)

    function prepare() {
        preparePost.value = true
    }
    function done() {
        preparePost.value = false
    }

    return { isPrepare: preparePost, prepare, done }
})
