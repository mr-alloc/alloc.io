import CollectionUtil from "~/utils/CollectionUtil";

export default class FileAlias {
    public static readonly DOCS = new FileAlias("docs", "문서");
    public static readonly ALGORITHM = new FileAlias("algorithm", "알고리즘");
    public static readonly JAVA = new FileAlias("java", "자바");
    public static readonly JAVASCRIPT = new FileAlias("javascript", "자바스크립트");
    public static readonly TYPESCRIPT = new FileAlias("typescript", "타입스크립트");
    public static readonly SPRING = new FileAlias("spring", "스프링");
    public static readonly SWIFT = new FileAlias("swift", "스위프트");
    public static readonly TOOLS = new FileAlias("tools", "도구");
    private static readonly CACHED = CollectionUtil.toMap(FileAlias.values(), (file) => file._value);

    private readonly _value: string;
    private readonly _name: string;

    private constructor(value: string, name: string) {
        this._value = value;
        this._name = name;
    }

    get value(): string {
        return this._value;
    }

    get name(): string {
        return this._name;
    }

    public static toNameIfAbsent(value: string): string {
        return FileAlias.CACHED.get(value)?.name ?? value;
    }

    public static values(): Array<FileAlias> {
        return [FileAlias.DOCS, FileAlias.ALGORITHM, FileAlias.JAVA, FileAlias.JAVASCRIPT, FileAlias.TYPESCRIPT,
            FileAlias.SPRING, FileAlias.SWIFT, FileAlias.TOOLS]
    }


}
