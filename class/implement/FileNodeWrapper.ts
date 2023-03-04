import { IFileNode } from "@/class/IFileNode";
import {FileNode} from "@/class/implement/FileNode";

export class FileNodeWrapper {
    name: string
    nodes?: IFileNode [] | undefined = []

    constructor(name: string, nodes: IFileNode [] | undefined) {
        this.name = name
        this.nodes = nodes
    }
}
