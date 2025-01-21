export default class Path {

    private readonly _value: string;
    private readonly _array: Array<string>;

    private constructor(path: string) {
        this._value = path;
        this._array = path.split("/").filter(node => node !== '') ?? [];
    }


    get value(): string {
        return this._value;
    }

    get array(): Array<string> {
        return this._array;
    }

    valueOf(index: number): string {
        this.rangeCheck(index);
        return this._array[index];
    }

    slugify(): string {
        return this._value.substring(0,this._value.indexOf(".")).toLowerCase();
    }

    private rangeCheck(index: number) {
        if (0 < index && index < this._array.length) return;
        throw new Error('out of index');
    }

    public static from(path: string) {
        return new Path(path);
    }
}
