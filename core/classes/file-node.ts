import FileType from "@core/constant/file-type";
import FileAlias from "@core/constant/file-alias";
import type Path from "@core/classes/path";
import type Filename from "@core/classes/filename";

export default class FileNode {
    private readonly _path: string;
    private readonly _name: string;
    private readonly _ext: string;
    private readonly _summary: string;
    private readonly _type: string;
    private readonly _hasIcon: boolean;
    private readonly _breadcrumbs: Array<string>;
    private readonly _group: string;
    private _files: Array<FileNode> = new Array<FileNode>();

    public constructor(
        path: string,
        name: string,
        ext: string,
        summary: string,
        breadcrumbs: Array<string>,
        type: FileType,
        hasIcon: boolean,
        group: string
    ) {
        this._path = path
        this._name = name
        this._ext = ext
        this._summary = summary
        this._breadcrumbs = breadcrumbs
        this._type = type.value;
        this._hasIcon = hasIcon
        this._files = new Array<FileNode>()
        this._group = group
    }

    set files(files: Array<FileNode> ) {
        this._files = files;
    }

    get path() {
        return this._path
    }

    get name() {
        return this._name
    }

    isDirectory() {
        return this._type === FileType.DIRECTORY.value
    }

    public static forDirectory(
        wholePath: Path,
        name: string,
        hasIcon: boolean
    ) {
        return new FileNode(
            wholePath.slugify(),
            name,
            '',
            FileAlias.toNameIfAbsent(name),
            wholePath.array.map(node => FileAlias.toNameIfAbsent(node)),
            FileType.DIRECTORY,
            hasIcon,
            wholePath.valueOf(1) ?? 'etc'
        );
    }

    public static forFile(
        wholePath: Path,
        name: Filename,
        summary: string
    ) {
        return new FileNode(
            wholePath.slugify(),
            name.value,
            name.ext,
            summary,
            wholePath.array.map(node => FileAlias.toNameIfAbsent(node)),
            FileType.FILE,
            false,
            wholePath.valueOf(1) ?? 'etc'
        );
    }

    toJSON() {
        return {
            path: this._path,
            name: this._name,
            ext: this._ext,
            summary: this._summary,
            breadcrumbs: this._breadcrumbs,
            type: this._type,
            hasIcon: this._hasIcon,
            files: this._files,
            group: this._group,
        }
    }
}
