// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
    /// false dev 에서 나옴
    ssr: false,
    generate: {
        dir: 'dist',
        routes: ['/docs/swift/swift_basic_1']
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
