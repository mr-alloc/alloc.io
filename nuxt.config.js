// https://nuxt.com/docs/api/configuration/nuxt-config
import { fileURLToPath} from "node:url";
import Keys from './src/static/keys.json'

export default defineNuxtConfig({
    devtools: {
        enabled: false
    },
    vite: {

    },
    srcDir: "src/",
    alias: {
        "@": fileURLToPath(new URL('./src', import.meta.url)),
        "~": fileURLToPath(new URL('./', import.meta.url)),
        "@styles": fileURLToPath(new URL('./assets/styles', import.meta.url))
    },
    experimental: {
        payloadExtraction: false
    },
    ssr: true,
    generate: {
        dir: 'dist',
        fallback: true,
        routes: [...Keys]
    },
    router: {
        base: '/special-posted-in/'
    },
    target: 'static',
    typescript: {
        strict: true
    },
    css: [
        '@fortawesome/fontawesome-svg-core/styles.css'
    ],
    build: {
        transpile: [
            '@fortawesome/fontawesome-svg-core',
            '@fortawesome/free-brands-svg-icons',
            '@fortawesome/free-regular-svg-icons',
            '@fortawesome/free-solid-svg-icons',
            '@fortawesome/vue-fontawesome'
        ]
    },
    modules: [
        '@pinia/nuxt',
        '@nuxt/image'
    ],
    pinia: {
        storesDirs: ['@/store/**']
    },

    compatibilityDate: '2024-07-09'
})
