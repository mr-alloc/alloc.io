import PostHeader from "@core/classes/post-header";

export default class PostData {

    private readonly _path: string;
    private readonly _header: PostHeader;
    private readonly _description: string;
    private readonly _content: string;

    constructor(path: string, header: any, description: string, content: string) {
        this._path = path;
        this._header = PostHeader.of(header);
        this._description = description.trim();
        this._content = content
    }

    get path(): string {
        return this._path
    }
    get header(): PostHeader {
        return this._header
    }

    get description(): string {
        return this._description
    }

    get content(): string {
        return this._content
    }

    toJSON() {
        return {
            path: this._path,
            header: this._header.value,
            description: this._description,
            content: this._content
        }
    }
}
