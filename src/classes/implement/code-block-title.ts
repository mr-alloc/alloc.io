import FileAlias from "@/classes/implement/file-alias";
import Filename from "@/classes/implement/filename";

export default class CodeBlockTitle {

    private readonly _language: string;
    private readonly _value: string;

    public constructor(language: string, value: string) {
        this._language = language;
        this._value = value;
    }

    get language(): string {
        return this._language;
    }

    get value(): string {
        return this._value;
    }

    public static of(name: string): CodeBlockTitle {
        if (FileAlias.isAlias(name)) {
            const fileAlias = FileAlias.of(name);
            return new CodeBlockTitle(fileAlias.original, fileAlias.value);
        } else if (Filename.isFilename(name)) {
            const filename = Filename.of(name);
            return new CodeBlockTitle(filename.ext, name);
        } else {
            throw new Error(`alias or filename is required: "${name}"`);
        }
    }
}