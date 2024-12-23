import type ICategoryNode from "@/classes/i-category-node";
import {isDirectory} from "path-type";

export default class CategoryGroup implements ICategoryNode {

    private readonly _isDirectory: boolean;
    private readonly _name: string;
    private readonly _children: Array<ICategoryNode>;
    private _isCollapse: boolean;

    constructor(isDirectory: boolean, name: string, isCollapse: boolean) {
        this._isDirectory = isDirectory;
        this._name = name;
        this._children = new Array<ICategoryNode>();
        this._isCollapse = isCollapse;
    }

    get isDirectory(): boolean {
        return this._isDirectory;
    }

    get name(): string {
        return this._name;
    }

    get children(): Array<ICategoryNode> {
        return this._children;
    }

    get isCollapse(): boolean {
        return this._isCollapse;
    }

    public addChild(child: ICategoryNode): void {
        this._children.push(child);
    }

    public collapse(): void {
        this._isCollapse = !this._isCollapse;
    }

    public toJSON() {
        return {
            "is_directory": this._isDirectory,
            "name": this._name,
            "children": this._children
        }
    }
}
