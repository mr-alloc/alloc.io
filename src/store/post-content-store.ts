import {defineStore} from "pinia";
import {PostMetadata} from "@/classes/implement/PostMetadata";
import {ref} from "@vue/reactivity";
import DocumentType from "@/classes/constant/document-type";
import type TocNode from "@/classes/implement/toc-node";
import {nestedToArray} from "@/utils/collection-util";

export const usePostContentStore = defineStore("PostMap", () => {


    const postContents = ref<Map<string, PostMetadata>>(new Map<string, PostMetadata>());
    const headlineMap = ref<Map<string, Map<string, TocNode>>>(new Map<string, Map<string, TocNode>>());
    const wikiCount = ref<number>(0);

    function add(post: PostMetadata) {
        const path = post.header.layout === DocumentType.WIKI.name ? `/wiki/${post.path.array[post.path.array.length - 1]}` : post.path.value;
        postContents.value.set(path,  post);
    }

    function get(path: string): PostMetadata | undefined {
        return postContents.value.get(path) as PostMetadata;
    }

    function isWiki(filename: string): boolean {
        return values(DocumentType.WIKI).some(post => post.filename === filename);
    }

    function getWiki(filename: string): PostMetadata | undefined {
        return postContents.value.get(`/wiki/${filename}`) as PostMetadata;
    }

    function values(documentType: DocumentType): Array<PostMetadata> {
        const values = postContents.value.values();
        return Array.from(values).filter(post => post.header.layout === documentType.name) as Array<PostMetadata>;
    }

    function allValues(): Array<PostMetadata> {
        return Array.from(postContents.value.values()) as Array<PostMetadata>;
    }

    function keys(): Array<string> {
        return Array.from(postContents.value.keys());
    }

    function completeAddPost() {
        headlineMap.value = [...postContents.value.values()].reduce((acc, post) => {
            const array = nestedToArray(post.header.rootHeadLine) as Array<TocNode>;
            acc.set(post.path.value, toMap<string, TocNode>(
                array,
                (toc) => toc.origin
            ));
            return acc;
        }, new Map<string, Map<string, TocNode>>());

        wikiCount.value = values(DocumentType.WIKI).filter(wiki => wiki.isPublic).length;
    }


    return {
        add,
        get,
        values,
        allValues,
        getWiki,
        isWiki,
        keys,
        completeAddPost,
        headlineMap,
        wikiCount
    }
});
