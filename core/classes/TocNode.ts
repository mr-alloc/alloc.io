function slugify(title: string) {
    const slug = title.trim()
        .toLowerCase()
        .replace(/\s+/g, '-');
    return encodeURIComponent(slug);
}
export default class TocNode {
    private readonly _grade: number;
    private readonly _title: string;
    private readonly _fragmentId: string;
    private readonly _children: Array<TocNode>;
    private readonly _isSelected: boolean;

    constructor(grade: number, title: string) {
        this._grade = grade
        this._title = title
        this._fragmentId = slugify(title)
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
        return this._fragmentId;
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
            fragmentId: this._fragmentId,
            children: this._children,
            isSelected: this._isSelected
        }
    }

}
