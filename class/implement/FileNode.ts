import { FileType } from "@/class/constant/BlogConstant";
import type {IFileNode} from "~/class/IFileNode";

export class FileNode implements IFileNode {
    readonly _path: string
    readonly _name: string
    readonly _type: string
    readonly _summary: string
    readonly _ext: string
    readonly _hasIcon: boolean
    readonly _files?: IFileNode [] | undefined
    readonly _group: string

    constructor(value: IFileNode) {
        this._path = value.path
        this._name = value.name
        this._type = value.type
        this._summary = value.summary
        this._ext = value.ext
        this._hasIcon = value.hasIcon
        this._files = value.files !== undefined ? FileNode.toFileTrees(value.files) : undefined
        this._group = value.group
    }

    get type(): string {
        return this._type
    }

    get path(): string {
        return this._path
    }

    get name(): string {
        return this._name
    }

    get files(): IFileNode[] | undefined {
        return this._files
    }

    get summary(): string {
        return this._summary
    }
    get ext(): string {
        return this._ext;
    }

    get group(): string {
        return this._group
    }
    isDirectory(): boolean {
        return this._type == FileType.DIR
    }

    get hasIcon(): boolean {
        return this._hasIcon
    }

    static toFileTrees (values: IFileNode[]): FileNode[] {
        return values.map(tree => new FileNode(tree))
    }
}
