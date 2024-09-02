const FileType = {
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
    _breadcrumbs
    _group

    constructor(filePath, fileName, ext, summary, breadcrumbs, type, hasIcon, group) {
        this._path = filePath
        this._name = fileName
        this._ext = ext
        this._summary = summary
        this._breadcrumbs = breadcrumbs
        this._type = type
        this._hasIcon = hasIcon
        this._files = new Array()
        this._group = group
    }

    set files(files) {
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


//core 에서 읽는 포스트 정보
class PostData {
    _path
    _header
    _description
    _content

    constructor(path, header, description, content) {
        this._path = path
        this._header = header
        this._description = description
        this._content = content
    }
    get path() {
        return this._path
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

    toJSON() {
        return {
            path: this._path,
            header: this._header,
            description: this._description,
            content: this._content

        }
    }
}

module.exports = {
    PostData,
    FileNode,
    FileType
}
