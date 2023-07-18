import { reactive } from "vue"
import { FileNodeWrapper } from "@/class/implement/FileNodeWrapper"
import { PostContent } from "@/class/implement/PostContent";
import packageJson from '@/package.json'
import {BlogInfo} from "~/class/implement/BlogInfo";

/* 포스팅 메타파일 읽고 저장 */
export const postContents =  reactive<PostContent[]>([])

/* 사이트 네비게이터 스택 */
export const naviStack = reactive<FileNodeWrapper[]>([])

/* postContents 에서 Dequeue 후 저장 */
export const feeds = reactive<PostContent[]>([])

/* 태그별 포스트 리스트맵*/
export const tagMap = reactive({
    store: new Map()
})

/* 경로별 파일노드 맵 */
export const fileNodeMap = reactive({
    store: new Map()
})

export const blogInfo = reactive<BlogInfo>(
    BlogInfo.create(
        packageJson.fullname,
        packageJson.username,
        packageJson.domain,
        packageJson.title,
        packageJson.description,
        packageJson.defaultProfile
    )
)
