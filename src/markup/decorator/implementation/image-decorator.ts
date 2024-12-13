import type IMarkdownDecorator from "@/markup/decorator/IMarkdownDecorator";
import MarkdownIt from "markdown-it";
import Token from "markdown-it/lib/token";
import TemplateAttributes from "@/markup/template/TemplateAttributes";
import TemplateExpression from "@/markup/template/TemplateExpression";
import Renderer from "markdown-it/lib/renderer";
import StateInline from "markdown-it/lib/rules_inline/state_inline";
import TokenNesting from "@/markup/constant/TokenNesting";
import StyleDecorator from "@/markup/decorator/style/style-decorator";


export default class ImageDecorator implements IMarkdownDecorator {

    private readonly KEY_OPEN = 'paragraph_open';
    private readonly KEY_CLOSE = 'paragraph_close';

    private readonly ATTR_INNER_ALIGN = 'align';


    decorate(markdownIt: MarkdownIt): void {
        const proxy = (tokens: Array<Token>, index: number, options: MarkdownIt.Options, env: any, self: Renderer) => self.renderToken(tokens, index, options);
        const fallbackRule = markdownIt.renderer.rules[this.KEY_OPEN] || proxy;

        markdownIt.renderer.rules[this.KEY_OPEN] = (
            tokens: Array<Token>,
            index: number,
            options: MarkdownIt.Options,
            env: any,
            self: Renderer
        ): string => {
            try {
                const inline = tokens[index +1];
                inline.content = '';
                const imageToken = this.findChild(inline.children, 'image');
                this.addDefaultImageClass(imageToken);
                const templateToken = this.findChild(inline.children, 'text');
                const attributes = TemplateAttributes.parse(templateToken.content).toMap();

                imageToken.attrJoin('data-description', attributes.get('description') ?? '');
                templateToken.content = '';

                StyleDecorator.getInstance().apply(imageToken, attributes);
                const wrapperClass = attributes.get('wrapper-class');
                return `<div class="flex not-prose ${wrapperClass}"><div><a href="#" class="my-2 inline-flex">`
            } catch (skip) {}
            return fallbackRule(tokens, index, options, env, self);
        }

        markdownIt.renderer.rules[this.KEY_CLOSE] = (
            tokens: Array<Token>,
            index: number,
            options: MarkdownIt.Options,
            env: any,
            self: Renderer
        ): string => {
            try {
                const inline = tokens[index - 1];
                const imageToken = this.findChild(inline.children, 'image');
                if (imageToken.attrGet('data-description') === null) {
                    return `</a></div></div>`
                }

                return (`</a><figcaption class="m-0 text-center">${imageToken.attrGet('data-description')}</figcaption></div></div>`);
            } catch(skip) {}
            return fallbackRule(tokens, index, options, env, self);
        }
    }

    private findChild(children: Token[] | null, inlineName: string): Token {
        if (!children) {
            throw new Error('No children found');
        }

        const child = children.find((token) => token.type === inlineName);
        if (!child) {
            throw new Error(`No child with ${inlineName} found`);
        }

        return child;
    }

    private addDefaultImageClass(imageToken: Token) {
        imageToken.attrJoin('class', 'my-0');
        imageToken.attrJoin('class', 'rounded-md');
    }
}
