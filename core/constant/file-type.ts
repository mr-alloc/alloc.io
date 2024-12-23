export default class FileType {

    public static readonly FILE = new FileType("file");
    public static readonly DIRECTORY = new FileType("directory");

    private readonly _value: string;

    private constructor(value: string) {
        this._value = value;
    }

    get value(): string {
        return this._value;
    }

}
