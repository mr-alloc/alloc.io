// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
    experimental: {
        payloadExtraction: false
    },
    ssr: false,
    generate: {
        dir: 'dist'
    },
    router: {
        base: '/special-posted-in/',
        trailingSlash: false
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
