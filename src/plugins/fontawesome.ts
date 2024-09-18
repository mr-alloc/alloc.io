import {library, config} from '@fortawesome/fontawesome-svg-core'
import { far } from '@fortawesome/free-regular-svg-icons'
import { fas } from '@fortawesome/free-solid-svg-icons'
import mitt from "mitt";
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";

library.add(fas, far);


// This is important, we are going to let Nuxt worry about the CSS
config.autoAddCss = false

export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.vueApp.component('FontAwesomeIcon', FontAwesomeIcon);
    const emitter = mitt();
    nuxtApp.provide('emitter', emitter);
})

