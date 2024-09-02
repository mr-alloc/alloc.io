import {library, config} from '@fortawesome/fontawesome-svg-core'
import {
    faUserSecret,
    faBars,
    faHeart,
    faMessage,
    faGlobe,
    faHelmetSafety,
    faTags,
    faClock,
    faMoon,
    faChevronRight,
    faChevronLeft,
    faPlus, faMagnifyingGlass
} from '@fortawesome/free-solid-svg-icons'
import {
    faFolder,
    faFileLines
} from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome"
import mitt from "mitt";

library.add(faUserSecret, faBars, faHeart, faMessage, faGlobe, faHelmetSafety, faTags, faClock, faMoon, faChevronRight, faChevronLeft, faPlus, faFolder, faFileLines, faMagnifyingGlass)


// This is important, we are going to let Nuxt worry about the CSS
config.autoAddCss = false

export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.vueApp.component('FontAwesomeIcon', FontAwesomeIcon)
    const emitter = mitt()
    nuxtApp.provide('emitter', emitter)
})

