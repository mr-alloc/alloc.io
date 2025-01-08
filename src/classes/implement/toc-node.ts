import type {Nested} from "@/utils/collection-util";

export default class TocNode implements Nested {

    private readonly _rank: number;
    private readonly _origin: string;
    private readonly _title: string;
    private readonly _fragment: string;
    private _children: Array<TocNode>;

    public constructor(node: any) {
        this._rank = node.rank
        this._origin = node.origin
        this._title = node.title
        this._fragment = node.fragment
        this._children = node.children.map(TocNode.createRecursive) ?? [];
    }

    get rank(): number {
        return this._rank;
    }

    get origin(): string {
        return this._origin;
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

    public addChild(child: Nested): void {
        this._children.push(child as TocNode);
    }

    public serialize(): any {
        return {
            rank: this._rank,
            origin: this._origin,
            title: this._title,
            fragment: this._fragment,
            children: []
        };
    }

    public static createRecursive(node: any): TocNode {
        return new TocNode(node);
    }

}

