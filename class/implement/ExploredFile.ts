import {FileType} from "@/class/constant/BlogConstant";

export class ExploredFile {

    _path: string
    _type: string
    _name: string

    constructor(file_path: string, file_type: string, file_name: string) {
        this._path = file_path
        this._type = file_type
        this._name = file_name
    }

    get path(): string {
        return this._path
    }

    get type(): string {
        return this._type
    }

    get name(): string {
        return this._name
    }

    isDirectory(): boolean {
        return this._type == FileType.DIR
    }

}
