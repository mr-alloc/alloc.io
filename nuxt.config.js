// https://nuxt.com/docs/api/configuration/nuxt-config
import { fileURLToPath} from "node:url";
import Keys from './src/static/keys.json';
import { toValueMap } from './core/util/CollectionUtil'

export default defineNuxtConfig({
    build: {
        extractCSS: true,
        splitChunks: {
            layouts: true,
            pages: true,
            commons: true
        }
    },
    optimization: {
        minimize: true
    },
    devtools: {
        enabled: false
    },
    srcDir: "src/",
    alias: {
        "@": fileURLToPath(new URL('./src', import.meta.url)),
        "~": fileURLToPath(new URL('./', import.meta.url)),
        "@styles": fileURLToPath(new URL('./assets/styles', import.meta.url))
    },
    experimental: {
        payloadExtraction: false,
    },
    nitro: {
        preset: 'static',
    },
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
        '@fortawesome/fontawesome-svg-core/styles.css',
        '@styles/main.css',
        '@styles/icons.css',
    ],
    vite: {
        css: {
            preprocessorOptions: {
                scss: {
                    additionalData: '@use "@styles/index.scss" as *;',
                    api: 'modern'
                }
            }
        }
    },
    routeRules: Object.fromEntries(toValueMap(Array.from(Keys), (e) => e, (e) => {
        return {
            prerender: false
        }
    }).entries()),
    modules: ['@pinia/nuxt', '@nuxt/image', '@nuxtjs/color-mode', '@nuxt/ui', '@nuxtjs/tailwindcss'],
    pinia: {
        storesDirs: ['@/store/**']
    },
    compatibilityDate: '2024-07-09',
});
