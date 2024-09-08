import {Headline} from "~/class/implement/Headline";

export class TocItem {
    private readonly _headline: Headline
    private readonly _children: Array<TocItem>
    private readonly _parent: TocItem | null

    constructor(headline: Headline, children: Array<TocItem>, parent: TocItem | null) {
        this._headline = headline
        this._children = children
        this._parent = parent
    }

    get headline(): Headline {
        return this._headline
    }

    get children(): Array<TocItem> {
        return this._children
    }

    get parent(): TocItem | null {
        return this._parent
    }
}
