import {isDirectory} from "path-type";
import type ICategoryNode from "@/classes/ICategoryNode";

export default class CategoryContent implements ICategoryNode{

    private readonly _isDirectory: boolean;
    private readonly _name: string;
    private readonly _path: string;

    constructor(isDirectory: boolean, name: string, path: string) {
        this._isDirectory = isDirectory;
        this._name = name;
        this._path = path;
    }


    get isDirectory(): boolean {
        return this._isDirectory;
    }

    get name(): string {
        return this._name;
    }

    get path(): string {
        return this._path;
    }

    public toJSON() {
        return {
            "is_directory": this._isDirectory,
            "name": this._name,
            "path": this._path
        }
    }
}
