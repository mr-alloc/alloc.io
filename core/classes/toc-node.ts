function slugify(title: string) {
    const slug = title.trim()
        .toLowerCase()
        .replace(/\s+/g, '-');
    return encodeURIComponent(slug);
}
export default class TocNode {
    private readonly _fragmentRE = /([^:]+)(?:::([\s\S]+))?/mg;
    private readonly _grade: number;
    private readonly _title: string;
    private readonly _fragment: string;
    private readonly _children: Array<TocNode>;
    private readonly _isSelected: boolean;

    constructor(grade: number, headline: string) {
        const [title, fragment] = this.parseHeadline(headline);
        this._grade = grade
        this._title = title
        this._fragment = fragment;
        this._children = []
        this._isSelected = false;
    }

    get grade(): number {
        return this._grade;
    }

    get title(): string {
        return this._title;
    }

    get fragmentId(): string {
        return this._fragment;
    }

    get isSelected(): boolean {
        return this._isSelected;
    }

    get children(): Array<TocNode> {
        return this._children
    }

    addChild (child: TocNode) {
        this._children.push(child)
    }

    hasChild() {
        return this._children.length > 0
    }

    toJSON() {
        return {
            grade: this._grade,
            title: this._title,
            fragment: this._fragment,
            children: this._children,
            isSelected: this._isSelected
        }
    }

    private readonly parseHeadline = (headline: string): [string, string] => {
        const executed = this._fragmentRE.exec(headline);

        const title = executed?.[1] ?? '';
        const fragment = executed?.[2] ?? '';

        return [title, fragment];
    }
}
