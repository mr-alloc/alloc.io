function slugify(title: string) {
    const slug = title.trim()
        .toLowerCase()
        .replace(/\s+/g, '-');
    return encodeURIComponent(slug);
}
export default class TocNode {
    private readonly _fragmentRE = /([^:]+)(?:::([\s\S]+))?/mg;

    private readonly _rank: number;
    private readonly _origin: string;
    private readonly _title: string;
    private _fragment: string;
    private readonly _children: Array<TocNode>;

    public constructor(grade: number, headline: string) {
        const [title, fragment] = this.parseHeadline(headline);
        this._rank = grade
        this._origin = headline;
        this._title = title
        this._fragment = fragment;
        this._children = []
    }

    /**
     * 오른차순 [값이 낮을 수록 높은 의미]
     */
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

    get children(): Array<TocNode> {
        return this._children
    }

    get hasChild(): boolean {
        return this._children.length > 0
    }

    public addChild (child: TocNode) {
        if (child._fragment === '') {
            child._fragment = `${this._fragment}-${this._children.length}`
        }
        this._children.push(child)
    }

    toJSON() {
        return {
            rank: this._rank,
            origin: this._origin,
            title: this._title,
            fragment: this._fragment,
            children: this._children
        }
    }

    private readonly parseHeadline = (headline: string): [string, string] => {
        const executed = this._fragmentRE.exec(headline);

        const title = executed?.[1] ?? '';
        const fragment = executed?.[2] ?? '';

        return [title, fragment];
    }

    public belongTo(parent: TocNode) {
        return this._rank > parent.rank;
    }

    public hasLargestRankChildThen(node: TocNode): boolean {
        return this.hasChild && this._children[this._children.length -1].rank < node.rank
    }
}
