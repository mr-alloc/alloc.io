import {defineStore} from "pinia";
import Pair from "@/classes/implement/pair";
import TocNode from "@/classes/implement/toc-node";

export const useScrollspy = defineStore('scroll-spy', () => {

    const observer = ref<IntersectionObserver>();
    const visibleHeadings = ref<string[]>([]);
    const activeHeadings = ref<string[]>([]);
    const allNodes = ref<Map<string, Pair<number, TocNode>>>(new Map<string, Pair<number, TocNode>>());
    const representationTitle = ref<string | undefined>();

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
        entries.forEach((entry) => {
            const id = entry.target.id;
            if (entry.isIntersecting) {
                visibleHeadings.value = [...visibleHeadings.value, id];
            } else {
                visibleHeadings.value = visibleHeadings.value.filter((h: string) => h !== id);
            }
        });
    }

    const updateHeadings = (rootHeadline: TocNode, headings: Element[]) => {
        headings.forEach((heading) => {
            if (!observer.value) {
                return;
            }
            observer.value.observe(heading);
        });

        let no = 0;
        const reduce = (node: TocNode) => {
            if (node.fragment !== '') {
                allNodes.value.set(node.fragment, new Pair<number, TocNode>(no++, node));
            }
            node.children.forEach(reduce);
        };
        reduce(rootHeadline);
    }

    const refreshRepresentationTitle = () => {
        const ordered = activeHeadings.value.sort((a, b) => {
            const aNode = allNodes.value.get(a)!;
            const bNode = allNodes.value.get(b)!;
            if (!aNode || !bNode) {
                console.error(`\n${a}::${JSON.stringify(aNode)}\n${b}::${JSON.stringify(bNode)}\n`);
            }

            //priority ascending
            return aNode.left - bNode.left;
        }).map((headline) => allNodes.value.get(headline)?.right);

        representationTitle.value = ordered[0]?.title;
    }

    watch(visibleHeadings, (val: string[], oldVal: string[]) => {
        if (val.length === 0) {
            activeHeadings.value = oldVal;
        } else {
            activeHeadings.value = val;
        }
        refreshRepresentationTitle();
    });


    // Create intersection observer
    onBeforeMount(() => (observer.value = new IntersectionObserver(observerCallback)));

    // Destroy it
    onBeforeUnmount(() => (observer.value?.disconnect()));

    const reinitializeObserver = () => {
        observer.value = new IntersectionObserver(observerCallback);
        visibleHeadings.value = [];
        activeHeadings.value = [];
    }

    return {
        visibleHeadings,
        activeHeadings,
        updateHeadings,
        reinitializeObserver,
        representationTitle
    }
});
