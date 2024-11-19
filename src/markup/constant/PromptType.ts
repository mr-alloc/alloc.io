export default class PromptType {

    private static readonly NOTE = new PromptType('note');
    private static readonly TIP = new PromptType('tip');
    private static readonly IMPORTANT = new PromptType('important');
    private static readonly WARNING = new PromptType('warning');

    private readonly _name: string;

    private constructor(name: string) {
        this._name = name;
    }

    get name(): string {
        return this._name;
    }

    private static values (): Array<PromptType> {
        return [this.NOTE, this.TIP, this.IMPORTANT, this.WARNING];
    }

    public static includes(name: string) {
        return this.values().some(icon => icon._name === name);
    }

}
