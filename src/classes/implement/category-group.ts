import type ICategoryNode from "@/classes/i-category-node";
import {CategoryAlias} from "@/classes/constant/category-alias";

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

    get childrenCount(): number {
        return this._children.reduce((acc, pre) => {
            if (pre.isDirectory) {
                const group = pre as CategoryGroup;
                return acc + group.childrenCount;
            }
            return acc + 1;
        }, 0)
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

    public sortChildren() {
        this._children.sort((a, b) => {
            if (a.isDirectory !== b.isDirectory) {
                return a.isDirectory ? -1 : 1;
            }


            const aName = a.isDirectory ? CategoryAlias.find(a.name).alias : a.name;
            const bName = b.isDirectory ? CategoryAlias.find(b.name).alias : b.name;
            return aName.localeCompare(bName, 'ko', {
                numeric: true,
                sensitivity: 'base'
            });
        })

        this._children.forEach(child => {
            if (child.isDirectory) {
                const group = child as CategoryGroup;
                group.sortChildren();
            }
        })
    }
}
