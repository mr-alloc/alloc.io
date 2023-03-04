export interface IFileNode {
    _path: string
    _name: string
    _type: string
    _summary: string
    _ext: string
    _hasIcon: boolean
    _files?: IFileNode []

    isDirectory(): boolean
}
