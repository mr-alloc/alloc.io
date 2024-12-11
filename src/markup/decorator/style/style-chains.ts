import MarkupStyle from "@/markup/decorator/style/markup-style";
import Token from "markdown-it/lib/token";
import type TemplateAttributes from "@/markup/template/TemplateAttributes";

export default class StyleChains {

    private readonly _chains: Array<MarkupStyle> = [];

    public constructor() {}


    public add(name: string, extractor: (token: Token, attributes: Map<string, string>) => void): StyleChains {
        this._chains.push(MarkupStyle.of(name, extractor));
        return this;
    }

    public get chains(): Array<MarkupStyle> {
        return this._chains;
    }

    public findWith(attributes: Map<string, string>) {
        return this._chains.filter(style => attributes.has(style.name));
    }
}
