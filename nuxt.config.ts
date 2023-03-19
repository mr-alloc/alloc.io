// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
    generate: {
        fallback: true
    },
    target: 'static',
    router: {
        base: '/special-posted-in/'
    },
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
    }
})
