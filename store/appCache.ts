import { reactive } from "vue"
import { FileNodeWrapper } from "~/class/implement/FileNodeWrapper"
import { PostContent } from "~/class/implement/PostContent";
import packageJson from '~/package.json'
import {BlogInfo} from "~/class/implement/BlogInfo";
import {ScrollStatus} from "~/class/implement/ScrollStatus";



export default {
    /* (피드용) 포스팅 메타파일 읽고 저장 */
    postContents: reactive<PostContent[]>([]),

    /* (검색용) 포스팅 메타 정보 */
    contentsForSearch: reactive<PostContent[]>([]),

    /* 사이트 네비게이터 스택 */
    naviStack: reactive<FileNodeWrapper[]>([]),

    /* postContents 에서 Dequeue 후 저장 */
    feeds: reactive<PostContent[]>([]),

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
