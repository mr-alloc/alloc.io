import { reactive } from 'vue'
import {FileListData} from "@/classes/implement/FileListData";
import PostListWrapper from "@/classes/implement/PostListWrapper";

export const fileListStore = reactive<FileListData>({
    file_list: []
})

export const postListStore = reactive<PostListWrapper>(new PostListWrapper([]));

export const postCallStore = reactive({
    is_calling: true
})

export const searchInputStore = reactive({
    input_text: '',
    result_list: []
})

export const mobileNaviStore = reactive({
    isActive: false
})

export const tabletNaviStore = reactive({
    isActive: false
})

export const menuClickableStore = reactive({
    isNotClickable: false
})

export const explorerHeaderStore = reactive({
    isActive: false
});
