import {PostContent} from "~/class/implement/PostContent";
import {PostSearchResult} from "~/class/implement/PostSearchResult";

export class PostSearchGroup {
    readonly _icon: string
    readonly _searchResults: PostSearchResult []

    constructor(icon: string, postContent: PostSearchResult []) {
        this._icon = icon
        this._searchResults = postContent
    }

    get icon(): string {
        return this._icon
    }

    get results(): PostSearchResult [] {
        return this._searchResults
    }

    update(results: PostSearchResult []) {
        this._searchResults.push(...results)
    }
}
