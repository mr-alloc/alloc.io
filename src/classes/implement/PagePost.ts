import {PostMetadata} from "@/classes/implement/PostMetadata";
import {calPostDate} from "@/utils/DateUtils";

export default class PagePost {
    private readonly _title: string
    private readonly _date: string
    private readonly _metadata: PostMetadata
    private readonly _tags: string []

    constructor(title: string, date: string, metadata: PostMetadata, tags: string[]) {
        this._title = title;
        this._date = date;
        this._metadata = metadata;
        this._tags = tags;
    }

    get title(): string {
        return this._title;
    }

    get date(): string {
        return this._date
    }

    get metadata(): PostMetadata {
        return this._metadata;
    }

    get tags(): string [] {
        return this._tags
    }

    public static of(postMeta: PostMetadata): PagePost {
        if (!postMeta) {
            throw new Error("Cannot find post metadata");
        }

        return new PagePost(
            postMeta.header.title,
            calPostDate(postMeta.header.date.toString()),
            postMeta,
            postMeta.header.tags
        );
    }
}
