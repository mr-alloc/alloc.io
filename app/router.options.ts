import { RouterConfig } from "@nuxt/schema";
// https://router.vuejs.org/api/interfaces/routeroptions.html
export default <RouterConfig> {
    routes: (_routes) => [
        {
            name: 'home',
            path: '/',
            component: () => import('~/pages/index.vue')
        },
        {
            name: 'post',
            path: '/docs/:pathMatch(.*)*',
            component: () => import('~/pages/docs/PostView.vue')
        },
        {
            name: 'tag',
            path: '/tags/:tag/:page(\\d+)',
            component: () => import('~/components/layout/content/TagList.vue')
        },
        {
            name: 'tags',
            path: '/tags',
            component: () => import('~/components/layout/content/TagList.vue')
        }
    ],
    scrollBehavior: (to, from, savedPosition) => {
        if (to.hash && to.path.match(/\/docs.+?/)) {
            const el: HTMLElement = document.querySelector(to.hash)!
            return {
                top: el.offsetTop - 100,
                left: 0,
                behavior: 'smooth'

            }
        }
        return {
            behavior: 'smooth',
            top: 0,
            left: 0
        }
    }
}
