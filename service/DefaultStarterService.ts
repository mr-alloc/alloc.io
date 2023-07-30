import StarterService from "@/service/StarterService";
import { FileNode } from "@/class/implement/FileNode";
import {contentsForSearch, fileNodeMap, naviStack, postContents, tagMap} from "@/store/site";
import {FileNodeWrapper} from "@/class/implement/FileNodeWrapper";
import {PostContent} from "@/class/implement/PostContent";
import {postMapStore} from "~/store";
import {Header} from "~/class/implement/Header";
import fileNodeJson from '@/static/file-node.json'
import postJson from '@/static/posts.json'
import {IFileNode} from "@/class/IFileNode";
import {IPostContent} from "@/class/IPostContent";

// @ts-ignore
const fileNode: IFileNode[] = fileNodeJson
// @ts-ignore
const posts: IPostContent[] = postJson

class DefaultStarterService implements StarterService {
    isInitialized: boolean
    private static instance: StarterService
    constructor(isInitialized: boolean) {
        this.isInitialized = false
    }

    public static getInstance(): StarterService {
        if(!DefaultStarterService.instance) {
            DefaultStarterService.instance = new DefaultStarterService(false)
        }

        return DefaultStarterService.instance
    }

    private settingFileNodes(): void {
        const nodes: IFileNode [] = FileNode.toFileTrees(fileNode)
        naviStack.push(new FileNodeWrapper('탐색', nodes))
        this.cacheFileNodeMap(nodes)
    }

    private cacheFileNodeMap(fileNodes: IFileNode[]): void {
        for (let node of fileNodes) {
            fileNodeMap.store.set(node._path, node)

            if (node._files) {
                this.cacheFileNodeMap(node._files)
            }
        }
    }

    private settingPostMap(): void {
        PostContent.toPosts(posts)
            .sort((a, b) => b.header.date.getTime() - a.header.date.getTime())
            .forEach(post => {
                //피드용
                postContents.push(post)
                // 새로고침시 피드용만 초기화
                if (this.isInitialized) return

                postMapStore.map.set(post._path, post)
                //검색용
                contentsForSearch.push(post)
                if(post.header) {
                    this.setTags(post.header, post._path)
                }
            })

    }

    init(): void {
        this.settingPostMap()
        if (this.isInitialized) {
            return
        }
        this.settingFileNodes()
    }

    private setTags(header: Header, path: string): void {
        header.tags.forEach(tag => {
            const linkList: Array<String> = tagMap.store.get(tag)
            if(linkList) {
                if( ! linkList.includes(path)) {
                    linkList.push(path)
                    tagMap.store.set(tag, linkList)
                }
            } else {

                tagMap.store.set(tag, [path])
            }
        })
    }

}

export default DefaultStarterService.getInstance()
