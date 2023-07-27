import {PostContent} from "~/class/implement/PostContent";
import {SearchStatus} from "~/class/implement/SearchStatus";

export class PostSearchResult {

    _status: SearchStatus
    readonly _postContent: PostContent

    constructor(content: PostContent) {
        this._status = SearchStatus.APPEAR
        this._postContent = content
    }

    get content(): PostContent {
        return this._postContent
    }

    get status(): String {
        return this._status
    }

    finalize() {
        this._status = SearchStatus.FINALIZE
    }

    carryOn() {
        this._status = SearchStatus.CARRY_ON
    }

    isFinalize(): boolean {
        return this._status == SearchStatus.FINALIZE
    }

    disappear() {
        this._status = SearchStatus.DISAPPEAR
    }
}
