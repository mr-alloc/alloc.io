import { IFileNode } from "@/class/IFileNode";
import { FileType } from "@/class/constant/BlogConstant";

export class FileNode implements IFileNode {
    readonly _path: string
    readonly _name: string
    readonly _type: string
    readonly _summary: string
    readonly _ext: string
    readonly _hasIcon: boolean
    readonly _files?: IFileNode []

    constructor(value: IFileNode) {
        this._path = value._path
        this._name = value._name
        this._type = value._type
        this._summary = value._summary
        this._ext = value._ext
        this._hasIcon = value._hasIcon
        this._files = value._files !== undefined ? FileNode.toFileTrees(value._files) : undefined
    }

    get type(): string {
        return this._type
    }

    get path(): string {
        return this._path
    }

    get files(): IFileNode[] | undefined {
        return this._files
    }

    get summary(): string {
        return this._summary
    }

    isDirectory(): boolean {
        return this._type == FileType.DIR
    }

    hasIcon(): boolean {
        return this._hasIcon
    }

    static toFileTrees (values: IFileNode[]): FileNode[] {
        return values.map(tree => new FileNode(tree))
    }
}
