import Header from "@/classes/implement/header";
import DocumentType from "@/classes/constant/document-type";
import {isEmpty} from "@/utils/string-utils";
import Path from "@/classes/implement/path";

export class PostMetadata {
    private readonly _path: Path
    private readonly _header: Header
    private readonly _description: string
    private readonly _content: string

    constructor(path: Path, header: Header, description: string, content: string) {
        this._path = path;
        this._header = header;
        this._description = description;
        this._content = content;
    }

    get filename(): string {
        const each = this._path.array;
        return each[each.length - 1];
    }

    get path(): Path {
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
        return this._path.array.slice(2, 3)[0] ?? 'etc';
    }

    static fromJson (json: any): PostMetadata {
        return new PostMetadata(
            Path.from(json.path),
            new Header(json.header),
            isEmpty(json.description) ? useAppConfig().description : json.description,
            json.content
        );
    }

    static toPosts (arrays: any[]): PostMetadata[] {
        return arrays.map(PostMetadata.fromJson)
    }

    get isPublic(): boolean {
        return this._header.hide !== undefined && !this.header.hide;
    }
}
