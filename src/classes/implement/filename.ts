export default class Filename {

    private static readonly RE = new RegExp('([^.]+)(\\.)([^.]+)', 'g');
    private readonly _value: string;
    private readonly _ext: string;

    public constructor(value: string, ext: string) {
        this._value = value;
        this._ext = ext;
    }


    get value(): string {
        return this._value;
    }

    get ext(): string {
        return this._ext;
    }

    public static isFilename(name: string): boolean {
        const result = this.RE.test(name);
        this.RE.lastIndex = 0;
        return result;
    }

    public static of(name: string): Filename {
        const executed = Filename.RE.exec(name);
        Filename.RE.lastIndex = 0;
        if (!executed) {
            throw new Error(`invalid file name: "${name}".`);
        }

        return new Filename(executed[1], executed[3]);
    }

    public static ofAlias(name: string): Filename {
        const aliasRE = /([^:]+)(?:::([\s\S]+))/mg;
        const isMatch = aliasRE.test(name);
        if (isMatch) {
            aliasRE.lastIndex = 0;
            const [_, ext, alias] = aliasRE.exec(name)!;
            aliasRE.lastIndex = 0;
            return new Filename(alias, ext);
        }

        return Filename.of(name);
    }

}
