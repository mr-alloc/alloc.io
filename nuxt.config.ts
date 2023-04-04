// https://nuxt.com/docs/api/configuration/nuxt-config
import keys from './static/keys.json'
console.log('keys',keys)
export default defineNuxtConfig({
    experimental: {
        payloadExtraction: false
    },
    ssr: false,
    generate: {
        dir: 'dist',
        routes: Array.from(keys),
        subFolders: false
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
