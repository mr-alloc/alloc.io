import StarterService from "@/service/StarterService";
import { FileNode } from "@/class/implement/FileNode";
import {naviStack, postContents, tagMap} from "@/store/site";
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

    private static instance: StarterService

    public static getInstance(): StarterService {
        if(!DefaultStarterService.instance) {
            DefaultStarterService.instance = new DefaultStarterService()
        }

        return DefaultStarterService.instance
    }

    private settingFileNodes(): void {
        const nodes: FileNode [] = FileNode.toFileTrees(fileNode)
        naviStack.push(new FileNodeWrapper('탐색', nodes))
    }

    private settingPostMap(): void {
        PostContent.toPosts(posts)
            .sort((a, b) => b.header.date.getTime() - a.header.date.getTime())
            .forEach(post => {
                postMapStore.map.set(post._path, post)
                postContents.push(post)
                if(post.header) {
                    this.setTags(post.header, post._path)
                }
            })
    }

    init(): void {
        this.settingFileNodes()
        this.settingPostMap()
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
