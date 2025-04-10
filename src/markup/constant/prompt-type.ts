export default class PromptType {

    private static readonly BLUE = new PromptType('note');
    private static readonly GREEN = new PromptType('tip');
    private static readonly PURPLE = new PromptType('important');
    private static readonly YELLOW = new PromptType('warning');
    private static readonly RED = new PromptType('caution');
    private static readonly GRAY = new PromptType('ignore');

    private readonly _name: string;

    private constructor(name: string) {
        this._name = name;
    }

    get name(): string {
        return this._name;
    }

    private static values (): Array<PromptType> {
        return [this.BLUE, this.GREEN, this.GREEN, this.PURPLE, this.YELLOW, this.RED, this.GRAY];
    }

    public static includes(name: string) {
        return this.values().some(icon => icon._name === name);
    }

}
