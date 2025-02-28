
import appCache from "@/store/app-cache";
import {usePostCallStore} from "@/store/post-call-store";


const DEFAULT_FEED_SIZE = 4
export const callPostFeed = (): void => {
    /* 최대 feed 사이즈 만큼 호출*/
    for(let i = 0; (i < DEFAULT_FEED_SIZE && appCache.postContents.length != 0); i++) {
        const post = appCache.postContents.shift();
        if (post?.header.layout === 'post') {
            appCache.feeds.push(post)
        }
    }

    /* 큐에 아직 호출 가능한 포스트가 있는경우 다음 호출 가능 */
    usePostCallStore().off();

}
