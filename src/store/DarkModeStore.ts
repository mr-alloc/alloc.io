import {defineStore} from "pinia"


export const useDarkModeStore = defineStore('darkModeSwitch', () => {
    const isDarkMode = ref(false);

    function collapse() {
        isDarkMode.value = !isDarkMode
    }
    function force(value: boolean) {
        isDarkMode.value = value
        const html = document.querySelector('html')!;
        const classes = html.classList;
        classes.remove('light', 'dark');
        classes.add(isDarkMode.value ? 'dark' : 'light');
    }

    return { isDarkMode, collapse, force }
});
