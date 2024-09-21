import Header from "@/classes/implement/Header";
import type IPostMetadata from "@/classes/IPostContent";

export class PostMetadata implements IPostMetadata {
    private readonly _path: string
    private readonly _header: Header
    private readonly _description: string
    private readonly _content: string

    constructor(postContent: IPostMetadata) {
        this._path = postContent.path
        this._header = new Header(postContent.header)
        this._description = postContent.description;
        this._content = postContent.content;
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

    static toPostContent (value: IPostMetadata): PostMetadata {
        return new PostMetadata(value)
    }

    static toPosts (posts: IPostMetadata[]): PostMetadata[] {
        return posts.map(PostMetadata.toPostContent)
    }
}
