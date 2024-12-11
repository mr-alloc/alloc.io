import type TemplateAttributes from "@/markup/template/TemplateAttributes";
import Token from "markdown-it/lib/token";

export default class MarkupStyle {

    private readonly _name: string;
    private readonly _applier: (token: Token, attributes: Map<string, string>) => void;

    private constructor(name: string, applier: (token: Token, attributes: Map<string, string>) => void) {
        this._name = name;
        this._applier = applier;
    }

    public static of(name: string, applier: (token: Token, attributes: Map<string, string>) => void): MarkupStyle {
        return new MarkupStyle(name, applier);
    }

    get name(): string {
        return this._name;
    }

    get applier(): (token: Token, attributes: Map<string, string>) => void {
        return this._applier;
    }
}
