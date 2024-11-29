export default class DocumentType {

    public static readonly POST = new DocumentType('post');
    public static readonly WIKI = new DocumentType('wiki');
    public static readonly NONE = new DocumentType('none');

    private readonly _name: string;

    private constructor(name: string) {
        this._name = name;
    }

    public static types(): Array<DocumentType> {
        return [this.POST, this.WIKI, this.NONE];
    }

    public static find(name: string): DocumentType {
        return this.types().find(type => type._name === name) ?? this.NONE;
    }

    get name(): string {
        return this._name;
    }
}