import {PostContent} from "@/class/implement/PostContent";
import {calPostDate} from "@/utils/settingUtils";
import markUp from "@/utils/markUp";

export class PagePost{
    private readonly _title: string
    private readonly _date: string
    private readonly _content: string
    private readonly _tags: string []

    constructor(title: string, date: string, content: string, tags: string[]) {
        this._title = title
        this._date = date
        this._content = content
        this._tags = tags
    }

    get title(): string {
        return this._title
    }

    get date(): string {
        return this._date
    }

    get content(): string {
        return this._content
    }

    get tags(): string [] {
        return this._tags
    }

    public static of(postMeta: PostContent): PagePost {
        if (!postMeta) {
            throw new Error("Cannot find post metadata");
        }

        return new PagePost(
            postMeta.header.title,
            calPostDate(postMeta.header.date.toString()),
            markUp(postMeta.content, postMeta),
            postMeta.header.tags
        );
    }
}
