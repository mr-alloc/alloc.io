import type { RouterConfig } from '@nuxt/schema'

// https://router.vuejs.org/api/interfaces/routeroptions.html
export default <RouterConfig> {
    routes: (_routes) => [
        {
            name: 'home',
            path: '/',
            component: () => import('~/pages/PostList.vue')
        },
        {
            name: 'post',
            path: '/docs/:pathMatch(.*)*',
            component: () => import('~/pages/docs/PostView.vue')
        },
        {
            name: 'tag',
            path: '/tags/:tag_name/:page',
            component: () => import('~/pages/tags/TagList.vue')
        },
        {
            name: 'tags',
            path: '/tags',
            component: () => import('~/pages/tags/TagList.vue')
        }
    ],
    scrollBehavior: () => {
        const body = document.getElementById('main-content-wrapper')!
        /* 현재 페이지의 스크롤이 아닌 내부 컨텐츠 컴포넌트 스크롤을 초기화.*/
        // body.scrollTo({
        //     behavior: 'smooth',
        //     top: 0,
        //     left: 0
        // })

        return {}
    }
}
