import Token from "markdown-it/lib/token";
import type TemplateAttributes from "@/markup/template/TemplateAttributes";
import StyleChains from "@/markup/decorator/style/style-chains";

export default class StyleDecorator {

    private static readonly _instance = new StyleDecorator();
    private readonly _styles: StyleChains;

    private constructor() {
        this._styles = new StyleChains();
    }

    public static getInstance(): StyleDecorator {
        return StyleDecorator._instance;
    }

    get styles(): StyleChains {
        return this._styles;
    }

    public apply(imageToken: Token, attributes: Map<string, string>) {
        this._styles.findWith(attributes).forEach(style => {
           style.applier(imageToken, attributes);
        });
    }
}