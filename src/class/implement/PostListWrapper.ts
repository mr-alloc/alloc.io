import PostData from "@/class/implement/PostData";

export default class PostListWrapper {
    private _latestIndex: number = 0
    private _postDataList: PostData [] = []

    constructor(postDataList: PostData[]) {
        this._postDataList = postDataList;
    }


    get latestIndex(): number {
        return this._latestIndex;
    }

    get postDataList(): PostData[] {
        return this._postDataList;
    }


    set latestIndex(value: number) {
        this._latestIndex = value;
    }

    set postDataList(value: PostData[]) {
        this._postDataList = value;
    }
}
