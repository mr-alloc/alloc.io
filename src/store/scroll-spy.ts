import {defineStore} from "pinia";

export const useScrollspy = defineStore('scroll-spy', () => {

    const observer = ref<IntersectionObserver>();
    const visibleHeadings = ref<string[]>([]);
    const activeHeadings = ref<string[]>([]);


    const observerCallback = (entries: IntersectionObserverEntry[]) => {
        console.log('------------observerCallback------------')
        entries.forEach((entry) => {
            const id = entry.target.id;
            console.log(entry.target);
            if (entry.isIntersecting) {
                visibleHeadings.value = [...visibleHeadings.value, id];
            } else {
                visibleHeadings.value = visibleHeadings.value.filter((h: string) => h !== id);
            }
        });
        console.log('----------------------------------------');
    }

    const updateHeadings = (headings: Element[]) => {
        console.log('updateHeadings: ', headings.length);
        headings.forEach((heading) => {
            if (!observer.value) {
                return;
            }

            observer.value.observe(heading);
        })
    }

    watch(visibleHeadings, (val: string[], oldVal: string[]) => {
        console.log('visibleHeadings val: ', val);
        console.log('visibleHeadings oldVal: ', oldVal);
        if (val.length === 0) {
            activeHeadings.value = oldVal;
        } else {
            activeHeadings.value = val;
        }
    })

    // Create intersection observer
    onBeforeMount(() => {
        observer.value = new IntersectionObserver(observerCallback);
        console.log('intersection observer created');
    });

    // Destroy it
    onBeforeUnmount(() => {
        observer.value?.disconnect();
        console.log('intersection observer destroyed');
    });

    return {
        visibleHeadings,
        activeHeadings,
        updateHeadings
    }
});
