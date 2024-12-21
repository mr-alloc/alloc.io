import {defineStore} from "pinia";
import {PostMetadata} from "@/classes/implement/PostMetadata";
import {ref} from "@vue/reactivity";
import DocumentType from "@/classes/constant/document-type";

export const usePostContentStore = defineStore("PostMap", () => {


    const postContents = ref<Map<string, PostMetadata>>(new Map<string, PostMetadata>());

    function add(post: PostMetadata) {
        postContents.value.set(post.path,  post);
    }

    function get(path: string): PostMetadata {
        if (postContents.value.has(path)) {
            return postContents.value.get(path) as PostMetadata;
        }

        throw new Error("Not found post with path: "+ path);
    }

    function isWiki(filename: string): boolean {
        return values(DocumentType.WIKI).some(post => post.filename === filename);
    }

    function getWiki(filename: string): PostMetadata {
        const wiki = values(DocumentType.WIKI)
            .find(post => post.filename === filename);
        if (wiki) {
            return wiki;
        }
        throw new Error("Not found wiki with filename: "+ filename);
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

    return {
        add,
        get,
        values,
        allValues,
        getWiki,
        isWiki,
        keys
    }
});
