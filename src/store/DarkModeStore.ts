import {defineStore} from "pinia"


export const useDarkModeStore = defineStore('darkModeSwitch', () => {
    const isDarkMode = ref(false)

    function collapse() {
        isDarkMode.value = !isDarkMode
    }
    function force(value: boolean) {
        isDarkMode.value = value
    }

    return { isDarkMode, collapse, force }
})
