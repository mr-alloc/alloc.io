type Nesting = 1 | 0 | -1;
/**
 * @see 'markdown-it/lib/token'
 */
export default class TokenNesting {

    public static readonly OPEN = new TokenNesting(1);
    public static readonly SELF_CLOSE = new TokenNesting(0);
    public static readonly CLOSE = new TokenNesting(-1);

    private readonly _value: Nesting;

    private constructor(value: Nesting) {
        this._value = value;
    }


    get value(): Nesting {
        return this._value;
    }
}
