// https://router.vuejs.org/api/interfaces/routeroptions.html
export default {
    routes: (_routes) => [
        {
            name: 'home',
            path: '/',
            component: () => import('@/pages/index.vue')
        },
        {
            name: 'docs',
            path: '/docs',
            component: () => import('@/pages/docs.vue'),
            meta: {
                heroBackground: 'opacity-30 z-20'
            },
            children: [
                {
                    name: 'docs-child',
                    path: ':slug(.*)*',
                    component: () => import('@/pages/docs/[...slug].vue')
                }
            ]
        },
        {
            name: 'wiki-index',
            path: '/wikis',
            component: () => import('@/pages/wikis.vue')
        },
        {
            name: 'wiki',
            path: '/wiki',
            component: () => import('@/pages/wiki.vue'),
            meta: {
                heroBackground: 'opacity-30 z-20'
            },
            children: [
                {
                    name: 'wiki-child',
                    path: ':slug(.*)*',
                    component: () => import('@/pages/wiki/[...slug].vue')
                }
            ]
        },
        {
            name: 'tag',
            path: '/tags/:tag/:page(\\d+)',
            component: () => import('@/components/layout/content/TagList.vue')
        },
        {
            name: 'tags',
            path: '/tags',
            component: () => import('@/components/layout/content/TagList.vue')
        }
    ],
    scrollBehavior: (to, from, savedPosition) => {
        if (to.hash && to.path.match(/\/(docs|wiki).+?/)) {
            const id = to.hash.replace('#', '');
            const element = document.getElementById(id);
            /* header height: 60, offset: 100 */
            const toBeTop = element.offsetTop - 160;

            return {
                top: toBeTop,
                left: 0,
                behavior: 'smooth'
            }

            /* header height: 60, offset: 100 */
        }

        return {
            behavior: 'smooth',
            top: 0,
            left: 0
        };
    }
}
