import {Header} from "~/class/implement/Header";

export const FileType = {
    DIR: 'DIRECTORY',
    POST: 'POST'
}

class FileNode {
    _path
    _name
    _ext
    _summary
    _type
    _files
    _hasIcon

    constructor(filePath: string, fileName: string, ext: string, summary: string, type: string, hasIcon: boolean) {
        this._path = filePath
        this._name = fileName
        this._ext = ext
        this._summary = summary
        this._type = type
        this._hasIcon = hasIcon
        this._files = new Array()
    }

    set files(files: FileNode[]) {
        this._files = files;
    }

    get path() {
        return this._path
    }

    get name() {
        return this._name
    }

    isDirectory() {
        return this._type == FileType.DIR
    }
}



class PostData {
    _path
    _header
    _description
    _content

    constructor(path: string, header: Header, description: string, content: string) {
        this._path = path
        this._header = header
        this._description = description
        this._content = content
    }

    get header() {
        return this._header
    }

    get description() {
        return this._description
    }

    get content() {
        return this._content
    }
}

module.exports = {
    PostData,
    FileNode,
    FileType
}
