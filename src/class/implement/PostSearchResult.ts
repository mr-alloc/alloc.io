import {PostContent} from "@/class/implement/PostContent";
import {SearchStatus} from "@/class/implement/SearchStatus";

export class PostSearchResult {

    private  _status: SearchStatus
    private  _isSelected: boolean
    private readonly _postContent: PostContent

    constructor(content: PostContent) {
        this._status = SearchStatus.APPEAR
        this._isSelected = false
        this._postContent = content
    }

    get content(): PostContent {
        return this._postContent
    }

    get status(): String {
        return this._status
    }

    selected(isSelected: boolean): void {
        this._isSelected = isSelected
    }


    get isSelected(): boolean {
        return this._isSelected
    }

    is(status: SearchStatus): boolean {
        return this._status === status
    }

    change(status: SearchStatus) {
        this._status = status
    }
}
