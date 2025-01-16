export default class FileAlias {
    private static readonly ALIAS_RE = new RegExp('([^:]+)(?:::([\\s\\S]+))', 'mg');

    private readonly _original: string;
    private readonly _value: string;

    public constructor(original:string, value: string) {
        this._original = original;
        this._value = value;
    }


    get original(): string {
        return this._original;
    }

    get value(): string {
        return this._value;
    }

    public static of(name: string): FileAlias {
        const executed = FileAlias.ALIAS_RE.exec(name);
        FileAlias.ALIAS_RE.lastIndex = 0;
        if (!executed) {
            throw new Error(`invalid file name: "${name}".`);
        }

        return new FileAlias(executed[1], executed[2]);
    }

    public static isAlias(name: string) {
        const isAlias = FileAlias.ALIAS_RE.test(name);
        FileAlias.ALIAS_RE.lastIndex = 0;
        return isAlias;
    }

    public toString(): string {
        return `${this._original}::${this._value}`;
    }
}