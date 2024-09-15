import {defineStore} from "pinia";
import {PostContent} from "@/class/implement/PostContent";

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

    return {
        postContentList: postContents.value.values(),
        add,
        get
    }
});
