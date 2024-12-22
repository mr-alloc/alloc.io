import Header from "@/classes/implement/Header";
import type IPostMetadata from "@/classes/IPostContent";
import DocumentType from "@/classes/constant/document-type";

export class PostMetadata implements IPostMetadata {
    private readonly _path: string
    private readonly _header: Header
    private readonly _description: string
    private readonly _content: string

    constructor(postContent: IPostMetadata) {
        this._path = postContent.path
        this._header = new Header(postContent.header);
        this._description = postContent.description;
        this._content = postContent.content;
    }

    get filename(): string {
        const each = this._path.split('/');
        return each[each.length - 1];
    }

    get path(): string {
        return this._path;
    }

    get content(): string {
        return this._content;
    }

    get description(): string {
        return this._description;
    }

    get header(): Header {
        return this._header;
    }

    get group(): string {
        if (this._header.layout === DocumentType.WIKI.name) {
            return 'wiki';
        }
        return this._path.split('/').slice(2, 3)[0] ?? 'etc';
    }

    static toPostContent (value: IPostMetadata): PostMetadata {
        return new PostMetadata(value);
    }

    static toPosts (posts: IPostMetadata[]): PostMetadata[] {
        return posts.map(PostMetadata.toPostContent)
    }

    get hasCategories() {
        return this._header.categories.length > 0;
    }

    get isPublic(): boolean {
        return this._header.hide !== undefined && !this.header.hide;
    }
}
