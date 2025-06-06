import {PostMetadata} from "@/classes/implement/PostMetadata";
import {SearchStatus} from "@/classes/constant/search-status";

export class PostSearchResult {

    private  _status: SearchStatus
    private  _isSelected: boolean
    private readonly _postContent: PostMetadata

    constructor(content: PostMetadata) {
        this._status = SearchStatus.APPEAR
        this._isSelected = false
        this._postContent = content
    }

    get content(): PostMetadata {
        return this._postContent
    }

    get status(): String {
        return this._status
    }

    get contentPath(): string {
        return this._postContent.header.layout === 'wiki'
            ? `/wiki/${this._postContent.path.last}`
            : this._postContent.path.value;
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
