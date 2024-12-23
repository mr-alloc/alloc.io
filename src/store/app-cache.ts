import {reactive} from "vue"
import {PostMetadata} from "@/classes/implement/PostMetadata";


export default {
    /* (피드용) 포스팅 메타파일 읽고 저장 */
    postContents: reactive<PostMetadata[]>([]),

    /* postContents 에서 Dequeue 후 저장 */
    feeds: reactive<PostMetadata[]>([]),

    /* 태그별 포스트 리스트맵*/
    tagMap: reactive({
        store: new Map()
    }),
}
