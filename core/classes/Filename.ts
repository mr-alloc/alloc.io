export default class Filename {

    private static readonly RE = new RegExp('([^.]+)(?:(\.)([^.]+))?', 'g');
    private readonly _value: string;
    private readonly _ext: string;

    public constructor(name: string) {
        const executed = Filename.RE.exec(name);
        if (!executed) {
            throw new Error("invalid file name");
        }

        this._value = executed[1];
        this._ext = executed[3];
        Filename.RE.lastIndex = 0;
    }

    get value(): string {
        return this._value;
    }

    get ext(): string {
        return this._ext;
    }

}
