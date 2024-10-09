import {defineStore} from "pinia";

export const useRouteStore = defineStore('route', () => {

    const path = ref<string>('/');

    function route(routePath: string) {
        path.value = routePath;
    }

    return  {
        path,
        route
    }
});
