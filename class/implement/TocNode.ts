export class TocNode {
    private readonly _grade: number
    private readonly _title: string
    private readonly _fragmentId: string
    private readonly _children: TocNode []
    private _isSelected: boolean

    constructor(grade: number, title: string) {
        this._grade = grade
        this._title = title
        this._fragmentId = title.replaceAll(/\s/gm, '-').toLowerCase()
        this._children = []
        this._isSelected = false
    }

    get grade(): number {
        return this._grade
    }

    get title(): string {
        return this._title
    }

    get children(): TocNode [] {
        return this._children
    }

    get fragmentId(): string {
        return this._fragmentId
    }

    get isSelected(): boolean {
        return this._isSelected
    }

    select(): void {
        this._isSelected = true
    }

    addChild (child: TocNode): void {
        this._children.push(child)
    }

    hasChild(): boolean {
        return this._children.length > 0
    }

}
