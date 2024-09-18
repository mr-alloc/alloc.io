import {defineStore} from "pinia";
import {PostContent} from "@/class/implement/PostContent";
import {ref} from "@vue/reactivity";

export const usePostContentStore = defineStore("PostMap", () => {


    const postContents = ref<Map<string, PostContent>>(new Map<string, PostContent>());

    function add(post: PostContent) {
        postContents.value.set(post.path,  post);
    }

    function get(path: string): PostContent {
        if (postContents.value.has(path)) {
            return postContents.value.get(path) as PostContent;
        }

        throw new Error("Not found post with path: "+ path);
    }

    function values(): Array<PostContent> {
        const values = postContents.value.values();
        const contents = Array.from(values) as Array<PostContent>;
        console.log('value in PostContentStore', values);
        return contents;
    }

    return {
        add,
        get,
        values
    }
});
