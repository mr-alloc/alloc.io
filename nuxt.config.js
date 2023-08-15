// https://nuxt.com/docs/api/configuration/nuxt-config
import Keys from './static/keys.json'

export default defineNuxtConfig({
    experimental: {
        payloadExtraction: false
    },
    ssr: true,
    generate: {
        dir: 'dist',
        fallback: true,
        routes: [...Keys],
    },
    router: {
        base: '/special-posted-in/',
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
        '@pinia/nuxt'
    ],
})
