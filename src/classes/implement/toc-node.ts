export default class TocNode {

    private readonly _grade: number;
    private readonly _title: string;
    private readonly _fragment: string;
    private readonly _children: Array<TocNode>;

    public constructor(node: any) {
        this._grade = node.grade
        this._title = node.title
        this._fragment = node.fragment
        this._children = node.children.map(TocNode.createRecursive);
    }

    get grade(): number {
        return this._grade;
    }

    get title(): string {
        return this._title;
    }

    get fragment(): string {
        return this._fragment;
    }

    get children(): TocNode[] {
        return this._children;
    }

    public static createRecursive(node: any): TocNode {
        return new TocNode(node);
    }

}

