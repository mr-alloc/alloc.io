import {library, config, IconDefinition} from '@fortawesome/fontawesome-svg-core'
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
    faPlus
} from '@fortawesome/free-solid-svg-icons'
import {
    faFolder,
    faFileLines
} from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome"
import mitt from "mitt";
// library.add(faUserSecret, faBars, faHeart, faMessage, faFolder, faFileLines, faGlobe, faHelmetSafety, faTags, faClock, faMoon, faChevronRight, faPlus)


// This is important, we are going to let Nuxt worry about the CSS
config.autoAddCss = false

export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.vueApp.component('font-awesome-icon', FontAwesomeIcon)
    const emitter = mitt()
    nuxtApp.provide('emitter', emitter)
})
