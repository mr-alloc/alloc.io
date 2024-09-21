import type {IFileNode} from "~/classes/IFileNode";

export class FileNodeWrapper {
    private readonly _name: string
    private readonly _nodes: Array<IFileNode> = new Array<IFileNode>();

    constructor(name: string, nodes: IFileNode [] | undefined = []) {
        this._name = name
        this._nodes = nodes
    }

    get name(): string {
        return this._name;
    }

    get nodes(): Array<IFileNode> {
        return this._nodes;
    }
}
