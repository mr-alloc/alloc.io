
export class CategoryAlias {

    private static readonly DEVELOPMENT = new CategoryAlias('development', '개발');
    private static readonly ALGORITHM = new CategoryAlias('algorithm', '알고리즘');
    private static readonly TYPESCRIPT = new CategoryAlias('typescript', '타입스크립트');
    private static readonly LANGUAGE = new CategoryAlias('language', '언어');
    private static readonly OS = new CategoryAlias('os', '운영체제');
    private static readonly DATABASE = new CategoryAlias('database', '데이터베이스');
    private static readonly MYSQL = new CategoryAlias('mysql', 'MySQL');
    private static readonly FRAMEWORK = new CategoryAlias('framework', '프레임워크');
    private static readonly SPRING = new CategoryAlias('spring', '스프링');
    private static readonly TOOL = new CategoryAlias('tool', '라이브러리/도구');
    private static readonly SOFTWARE_DESIGN = new CategoryAlias('software-design', '소프트웨어 디자인');
    private static readonly STRUCTURE = new CategoryAlias('structure', '구조');
    private static readonly BEHAVIOR = new CategoryAlias('behavior', '행동');
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
        return [this.DEVELOPMENT, this.ALGORITHM, this.LANGUAGE, this.TYPESCRIPT, this.OS, this.DATABASE, this.MYSQL,
            this.FRAMEWORK, this.SPRING, this.TOOL, this.SOFTWARE_DESIGN, this.STRUCTURE, this.BEHAVIOR, this.ETC];
    }


    public static find(name: string): CategoryAlias {
        return this.CACHED.get(name) ?? CategoryAlias.ETC;
    }

}
