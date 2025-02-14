
export class CategoryAlias {

    private static readonly DEVELOPMENT = new CategoryAlias('development', '개발');
    private static readonly ALGORITHM = new CategoryAlias('algorithm', '알고리즘');
    private static readonly DATA_STRUCTURE = new CategoryAlias('data-structure', '자료구조');
    private static readonly TYPESCRIPT = new CategoryAlias('typescript', '타입스크립트');
    private static readonly LANGUAGE = new CategoryAlias('language', '언어');
    private static readonly JAVA = new CategoryAlias('java', '자바');
    private static readonly CPP = new CategoryAlias('cpp', 'C++');
    private static readonly COMPUTER_SCIENCE = new CategoryAlias('computer-science', '컴퓨터 공학');
    private static readonly COMPUTER_STRUCTURE = new CategoryAlias('computer-structure', '컴퓨터 구조');
    private static readonly OPERATING_SYSTEM = new CategoryAlias('operating-system', '운영체제');
    private static readonly DATABASE = new CategoryAlias('database', '데이터베이스');
    private static readonly MYSQL = new CategoryAlias('mysql', 'MySQL');
    private static readonly NETWORK = new CategoryAlias('network', '네트워크');
    private static readonly BACK_END = new CategoryAlias('back-end', '서버/백엔드');
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
        return [this.DEVELOPMENT, this.ALGORITHM, this.DATA_STRUCTURE, this.LANGUAGE, this.JAVA, this.TYPESCRIPT, this.CPP,
            this.COMPUTER_STRUCTURE, this.OPERATING_SYSTEM, this.COMPUTER_SCIENCE, this.DATABASE, this.MYSQL, this.NETWORK,
            this.BACK_END, this.SPRING, this.TOOL, this.SOFTWARE_DESIGN, this.STRUCTURE, this.BEHAVIOR, this.ETC];
    }


    public static find(name: string): CategoryAlias {
        return this.CACHED.get(name) ?? CategoryAlias.ETC;
    }

}
