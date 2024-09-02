import {Header} from "@/class/implement/Header";
import type {IPostContent} from "~/class/IPostContent";

export class PostContent implements IPostContent {
    private readonly _path: string
    private readonly _header: Header
    private readonly _description: string
    private readonly _content: string

    constructor(postContent: IPostContent) {
        this._path = postContent.path
        this._header = new Header(postContent.header)
        this._description = postContent.description
        this._content = postContent.content
    }

    get path(): string {
        return this._path
    }

    get content(): string {
        return this._content
    }

    get description(): string {
        return this._description
    }

    get header(): Header {
        return this._header
    }

    static toPostContent (value: IPostContent): PostContent {
        return new PostContent(value)
    }

    static toPosts (posts: IPostContent[]): PostContent[] {
        return posts.map(PostContent.toPostContent)
    }
}
