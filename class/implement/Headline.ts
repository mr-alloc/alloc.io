export class Headline {
    private readonly _level: number
    private _text: string
    private _anchor: string

    constructor(level: number, text: string, anchor: string) {
        this._level = level
        this._text = text
        this._anchor = anchor
    }

    get level(): number {
        return this._level
    }

    get text(): string {
        return this._text
    }

    get anchor(): string {
        return this._anchor
    }

    set text(value: string) {
        this._text = value
    }

    set anchor(value: string) {
        this._anchor = value
    }
}
