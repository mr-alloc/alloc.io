export default class TocNode {

    private readonly _grade: number;
    private readonly _title: string;
    private readonly _fragmentId: string;
    private readonly _children: Array<TocNode>;

    constructor(node: any) {
        this._grade = node.grade
        this._title = node.title
        this._fragmentId = node.fragmentId
        this._children = node.children.map(TocNode.createRecursive);
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

    public static createRecursive(node: any): TocNode {
        return new TocNode(node);
    }

}

