import da from "date-format-parse/src/locale/da";

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
}
