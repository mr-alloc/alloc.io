import {PostContent} from "~/class/implement/PostContent";

export class PostContentGroup {
    readonly _icon: string
    readonly _postContents: PostContent []

    constructor(icon: string, postContent: PostContent []) {
        this._icon = icon
        this._postContents = postContent
    }

    get icon(): string {
        return this._icon
    }

    get contents(): PostContent [] {
        return this._postContents
    }
}
