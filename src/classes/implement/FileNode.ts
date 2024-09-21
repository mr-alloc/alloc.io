import type {IFileNode} from "~/classes/IFileNode";

export class FileNode implements IFileNode {
    private readonly _path: string
    private readonly _name: string
    private readonly _type: string
    private readonly _summary: string
    private readonly _ext: string
    private readonly _hasIcon: boolean
    private readonly _files?: IFileNode [] | undefined
    private readonly _group: string

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
        return this._type === "directory";
    }

    get hasIcon(): boolean {
        return this._hasIcon
    }

    static toFileTrees (values: IFileNode[] = []): FileNode[] {
        return values.map(tree => new FileNode(tree))
    }
}
