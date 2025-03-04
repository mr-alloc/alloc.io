// https://nuxt.com/docs/api/configuration/nuxt-config
import { fileURLToPath} from "node:url";
import Keys from './src/static/keys.json';
import { toValueMap } from './core/util/collection-util'

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
        enabled: true
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
        prerender: {
            autoSubfolderIndex: false
        }
    },
    generate: {
        dir: 'dist',
        fallback: true,
        routes: ['/wikis',...Keys]
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
    routeRules: Object.fromEntries(toValueMap(Array.from(['/wiki', '/docs', ...Keys]), (e) => e, (e) => {
        //nuxt에서는 내부적인 크롤러로 링크된 경로까지 확인하기 때문에 존재하지 않는 경로는 링크 되지 않아야한다.
        //또한 /wiki 나 '/docs' 처럼 래핑 컴포넌트에대한 라우딩은 이루어지면 안되기 때문에 리다이렉트 시킨다.
        if (e === '/wiki' || e === '/docs') {
            return {
                redirect: '/',
                prerender: false
            }
        }
        return {
            prerender: true
        }
    }).entries()),
    modules: ['@pinia/nuxt', '@nuxtjs/color-mode', '@nuxt/ui', '@nuxtjs/tailwindcss'],
    pinia: {
        storesDirs: ['@/store/**']
    },
    googleFonts: {
        families: {
            'Noto+Sans+KR': [400, 700],
        }
    },
    colorMode: {
        fallback: 'light', // 시스템 환경이 없을 경우 기본 모드
        classSuffix: '',
        storageKey: 'nuxt-color-mode', // 저장할 localStorage의 키 이름
        forced: true
    },
    compatibilityDate: '2024-07-09',
});
