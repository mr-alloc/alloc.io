import {ExploredFile} from "@/classes/implement/ExploredFile";

export class ExploredDirectory {
    _directory_title: string
    _elements: ExploredFile []

    constructor(directory_title: string, elements: ExploredFile []) {
        this._directory_title = directory_title
        this._elements = elements
    }

    get title(): string {
        return this._directory_title
    }

    get elements(): ExploredFile[] {
        return this._elements
    }
}
