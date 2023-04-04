// https://nuxt.com/docs/api/configuration/nuxt-config
import keys from './static/keys.json'

export default defineNuxtConfig({
    /// false dev 에서 나옴
    ssr: false,
    generate: {
        dir: 'dist',
        routes: Array.from(keys)
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
