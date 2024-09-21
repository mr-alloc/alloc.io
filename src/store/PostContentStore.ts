import {defineStore} from "pinia";
import {PostMetadata} from "@/classes/implement/PostMetadata";
import {ref} from "@vue/reactivity";

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

    function values(): Array<PostMetadata> {
        const values = postContents.value.values();
        return Array.from(values) as Array<PostMetadata>;
    }

    return {
        add,
        get,
        values
    }
});
