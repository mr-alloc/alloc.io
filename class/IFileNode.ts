export interface IFileNode {
    readonly _path: string
    readonly _name: string
    readonly _type: string
    readonly _summary: string
    readonly _ext: string
    readonly _hasIcon: boolean
    readonly _files?: IFileNode []

    isDirectory(): boolean

    get type(): string
}
