export default class RuleType {

    public static readonly BLOCK_QUOTE = new RuleType('blockquote');
    public static readonly HEADLINE = new RuleType('headline');
    public static readonly CODE_BLOCK = new RuleType('code_block');

    private readonly _name: string;
    private constructor(name: string) {
        this._name = name
    }

    get name(): string {
        return this._name;
    }
}
