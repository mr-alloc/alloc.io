import type ICategoryNode from "@/classes/ICategoryNode";
import {isDirectory} from "path-type";

export default class CategoryGroup implements ICategoryNode {

    private readonly _isDirectory: boolean;
    private readonly _name: string;
    private readonly _children: Array<ICategoryNode>;

    constructor(isDirectory: boolean, name: string) {
        this._isDirectory = isDirectory;
        this._name = name;
        this._children = new Array<ICategoryNode>();
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

    public addChild(child: ICategoryNode): void {
        this._children.push(child);
    }

    public toJSON() {
        return {
            "is_directory": this._isDirectory,
            "name": this._name,
            "children": this._children
        }
    }
}
