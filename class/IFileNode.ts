export interface IFileNode {

    get path(): string;
    get name(): string;
    get type(): string;
    get summary(): string;
    get ext(): string;
    get hasIcon(): boolean;
    get files(): IFileNode[] | undefined;
    get group(): string;

    isDirectory(): boolean
}
