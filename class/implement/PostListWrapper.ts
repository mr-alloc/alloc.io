import {PostData} from "@/class/implement/PostData";

export class PostListWrapper {
    latest_index: number = 0
    postDataList: PostData [] = []

    constructor(postDataList: PostData[]) {
        this.postDataList = postDataList
    }

}
