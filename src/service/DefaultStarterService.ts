import appCache from "@/store/appCache";
import {PostMetadata} from "@/classes/implement/PostMetadata";
import Header from "@/classes/implement/Header";
import postJson from '@/static/posts.json';
import type StarterService from "@/service/StarterService";
import {usePostContentStore} from "@/store/post-content-store";
import {useCategoriesStore} from "@/store/CategoriesStore";


// @ts-ignore
const posts: IPostContent[] = postJson

class DefaultStarterService implements StarterService {

    private readonly isInitialized: boolean;
    private static instance: StarterService;

    constructor(isInitialized: boolean) {
        this.isInitialized = isInitialized
    }

    public static getInstance(): StarterService {
        if(!DefaultStarterService.instance) {
            DefaultStarterService.instance = new DefaultStarterService(false);
        }

        return DefaultStarterService.instance;
    }

    private settingPosts(): void {
        const postContentStore = usePostContentStore();
        const postMetadataList = PostMetadata.toPosts(posts)
            .sort((a, b) => b.header.date.getTime() - a.header.date.getTime());

        postMetadataList
            .forEach(post => {
                //피드용
                appCache.postContents.push(post);

                // 새로고침시 피드용만 초기화
                if (this.isInitialized) return
                //포스팅용
                postContentStore.add(post)

                if(post.header) {
                    this.setTags(post.header, post.path)
                }
            });

        if (this.isInitialized) {
            return;
        }

    }

    init(): void {
        if (this.isInitialized) {
            return;
        }
        this.settingPosts();
    }

    private setTags(header: Header, path: string): void {
        header.tags.forEach(tag => {
            const linkList: Array<String> = appCache.tagMap.store.get(tag)
            if(linkList) {
                if( ! linkList.includes(path)) {
                    linkList.push(path)
                    appCache.tagMap.store.set(tag, linkList)
                }
            } else {

                appCache.tagMap.store.set(tag, [path])
            }
        })
    }

}

export default DefaultStarterService.getInstance()
