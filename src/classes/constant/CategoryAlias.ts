
export class CategoryAlias {

    private static readonly DEVELOPMENT = new CategoryAlias('development', '개발');
    private static readonly ALGORITHM = new CategoryAlias('algorithm', '알고리즘');
    private static readonly TYPESCRIPT = new CategoryAlias('typescript', '타입스크립트');
    private static readonly LANGUAGE = new CategoryAlias('language', '언어');
    private static readonly OS = new CategoryAlias('os', '운영체제');
    private static readonly DATABASE = new CategoryAlias('database', '데이터베이스');
    private static readonly MYSQL = new CategoryAlias('mysql', 'MySQL');
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
        return [this.DEVELOPMENT, this.ALGORITHM, this.LANGUAGE, this.TYPESCRIPT, this.OS, this.DATABASE, this.MYSQL, this.ETC];
    }


    public static find(name: string): CategoryAlias {
        return this.CACHED.get(name) ?? CategoryAlias.ETC;
    }

}
