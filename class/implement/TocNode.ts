export default class TocNode {
    private readonly _grade: number
    private readonly _title: string
    private readonly _fragmentId: string
    private _children: TocNode []
    private _isSelected: boolean

    constructor(node: any) {
        this._grade = node.grade
        this._title = node.title
        this._fragmentId = node.fragmentId
        this._children = node.children
        this._isSelected = false
    }

    select(): void {
        this._isSelected = true
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

    get children(): TocNode[] {
        return this._children;
    }

    get isSelected(): boolean {
        return this._isSelected;
    }

    public static createRecursive(node: any): TocNode {
        const tocNode = new TocNode(node)
        tocNode._children = node.children.map((child: any) => TocNode.createRecursive(child))
        return tocNode;
    }

}

