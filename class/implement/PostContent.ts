import {Header} from "@/class/implement/Header";
import {IPostContent} from "@/class/IPostContent";

export class PostContent implements IPostContent{
    _path: string
    _header: Header
    _description: string
    _content: string

    constructor(postContent: IPostContent) {
        this._path = postContent._path
        this._header = new Header(postContent._header)
        this._description = postContent._description
        this._content = postContent._content
    }

    get path() {
        return this._path
    }

    get content() {
        return this._content
    }

    get description() {
        return this._description
    }

    get header() {
        return this._header
    }

    static toPostContent (value: IPostContent): PostContent {
        return new PostContent(value)
    }

    static toPosts (posts: IPostContent[]): PostContent[] {
        return posts.map(post => PostContent.toPostContent(post))
    }
}
