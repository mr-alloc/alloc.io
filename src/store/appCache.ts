import { reactive } from "vue"
import { FileNodeWrapper } from "@/classes/implement/FileNodeWrapper"
import { PostMetadata } from "@/classes/implement/PostMetadata";
import packageJson from '~/package.json'
import {BlogInfo} from "@/classes/implement/BlogInfo";
import {ScrollStatus} from "@/classes/implement/ScrollStatus";



export default {
    /* (피드용) 포스팅 메타파일 읽고 저장 */
    postContents: reactive<PostMetadata[]>([]),

    /* 사이트 네비게이터 스택 */
    naviStack: reactive<FileNodeWrapper[]>([]),

    /* postContents 에서 Dequeue 후 저장 */
    feeds: reactive<PostMetadata[]>([]),

    /* 태그별 포스트 리스트맵*/
    tagMap: reactive({
        store: new Map()
    }),

    /* 경로별 파일노드 맵 */
    fileNodeMap: reactive({
        store: new Map()
    }),

    /* 블로그 메타 정보*/
    blogInfo: reactive<BlogInfo>(
        BlogInfo.create(
            packageJson.fullname,
            packageJson.username,
            packageJson.domain,
            packageJson.title,
            packageJson.description,
            packageJson.defaultProfile
        )
    ),

    /* 스크롤 정보 */
    scrollStatus: reactive<ScrollStatus>(ScrollStatus.ofDefault())
}
