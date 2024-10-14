import alias from "@rollup/plugin-alias";

export class CategoryAlias {

    private static readonly DEVELOPMENT = new CategoryAlias('development', '개발');
    private static readonly ALGORITHM = new CategoryAlias('algorithm', '알고리즘');
    private static readonly TYPESCRIPT = new CategoryAlias('typescript', '타입스크립트');
    private static readonly ETC = new CategoryAlias('etc', '기타');

    private static readonly CACHED = toMap(this.values(), (alias) => alias.name);

    private readonly _name: string;
    private readonly _alias: string;

    private constructor(name: string, alias: string) {
        this._name = name;
        this._alias = alias;
    }

    get name(): string {
        return this._name;
    }

    get alias(): string {
        return this._alias;
    }

    private static values(): Array<CategoryAlias> {
        return [this.DEVELOPMENT, this.ALGORITHM, this.TYPESCRIPT, this.ETC];
    }


    public static find(name: string): CategoryAlias {
        return this.CACHED.get(name) ?? CategoryAlias.ETC;
    }

}
