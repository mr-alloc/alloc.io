export default class PromptIcon {

    private static readonly LIGHTBULB = new PromptIcon('lightbulb');
    private static readonly INFO = new PromptIcon('info');
    private static readonly WARNING_DIAMOND = new PromptIcon('warning-diamond');
    private static readonly WARNING_OCTAGON = new PromptIcon('warning-octagon');
    private static readonly CHECK_CIRCLE = new PromptIcon('check-circle');

    private readonly _name: string;

    private constructor(name: string) {
        this._name = name;
    }

    get name(): string {
        return this._name;
    }

    private static values () {
        return [this.LIGHTBULB, this.INFO, this.WARNING_DIAMOND, this.WARNING_OCTAGON, this.CHECK_CIRCLE];
    }

    public static includes(name: string) {
        return this.values().some(icon => icon._name === name);
    }

}
