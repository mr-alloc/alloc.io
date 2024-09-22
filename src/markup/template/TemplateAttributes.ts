import TemplateExpression from "@/markup/template/TemplateExpression";

export default class TemplateAttributes {

    private static readonly KEY_TYPE: string = 'type';
    private static readonly KEY_ICON: string = 'icon';

    private readonly _text: string;
    private readonly _origin: string;
    private readonly _attributes: any;

    private constructor(text: string, attributes: string) {
        this._text = text;
        this._origin = attributes;
        this._attributes = JSON.parse(attributes);
    }


    get text(): string {
        return this._text;
    }

    get origin(): string {
        return this._origin;
    }

    get type(): string {
        return this._attributes[TemplateAttributes.KEY_TYPE];
    }

    get icon(): string {
        return this._attributes[TemplateAttributes.KEY_ICON];
    }

    public static parse(src: string): TemplateAttributes {
        if ( ! TemplateExpression.test(src)) {
            console.error(`Cannot parse template for string: "${src}"`);
            return new TemplateAttributes(src, '{}');
        }

        const executed = TemplateExpression.exec(src);
        return new TemplateAttributes(
            executed[TemplateExpression.TEXT_INDEX],
            executed[TemplateExpression.ATTRS_INDEX]
        );
    }

    public hasType(): boolean {
        return this._attributes[TemplateAttributes.KEY_TYPE] !== undefined;
    }

    public hasIcon(): boolean {
        return this._attributes[TemplateAttributes.KEY_ICON] !== undefined;
    }
}
