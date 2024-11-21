import type IMarkdownDecorator from "@/markup/decorator/IMarkdownDecorator";
import MarkdownIt from "markdown-it";
import Token from "markdown-it/lib/token";
import TemplateAttributes from "@/markup/template/TemplateAttributes";
import TemplateExpression from "@/markup/template/TemplateExpression";
import Renderer from "markdown-it/lib/renderer";
import StateInline from "markdown-it/lib/rules_inline/state_inline";
import TokenNesting from "@/markup/constant/TokenNesting";


export default class ImageDecorator implements IMarkdownDecorator {

    private readonly KEY_OPEN = 'paragraph_open';
    private readonly KEY_CLOSE = 'paragraph_close';

    private readonly ATTR_IMAGE_MAX_WIDTH = 'max-width';
    private readonly ATTR_IMAGE_MAX_HEIGHT = 'max-height';
    private readonly ATTR_INNER_ALIGN = 'align';
    private readonly IMAGE_STYLE_ATTRS = [this.ATTR_IMAGE_MAX_WIDTH, this.ATTR_IMAGE_MAX_HEIGHT];


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
                const templateToken = this.findChild(inline.children, 'text');
                const attributes = TemplateAttributes.parse(templateToken.content).toMap();

                imageToken.attrJoin('data-description', attributes.get('description') ?? '');
                templateToken.content = '';

                const wrapperStyle = this.stylingWrapper(attributes);
                const wrapperClass = this.classWrapper(attributes);
                this.styleImage(imageToken, attributes);
                return `<div style="${wrapperStyle}" class="${wrapperClass}"><div><a href="#" class="my-2 inline-flex">`
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

                return (`</a><figcaption class="m-0 text-center">${imageToken.attrGet('data-description')}</figcaption></div></div>`);
            } catch(skip) {}
            return fallbackRule(tokens, index, options, env, self);
        }
    }

    private stylingWrapper(attributes: Map<string, string>): string {
        return '';
    }

    private classWrapper(attributes: Map<string, string>): string {
        const defaultClass = ['flex'];
        const alignClass = this.getAlignClass(attributes);
        if (alignClass !== '') {
            defaultClass.push(alignClass);
        }

        return defaultClass.join(' ');
    }

    private styleImage(imageToken: Token, attributes: Map<string, string>): void {
        const styles = this.IMAGE_STYLE_ATTRS.filter((key) => attributes.has(key))
            .map((key) => `${key}: ${attributes.get(key)}`);


        imageToken.attrJoin('style', styles.join(';'));
        imageToken.attrJoin('class', 'my-0');
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

    private getAlignClass(attributes: Map<string, string>): string {
        const align = attributes.get(this.ATTR_INNER_ALIGN);
        if (align === 'center') {
            return 'justify-center';
        } else if (align === 'right') {
            return 'justify-end';
        } else if (align === 'left') {
            return 'justify-start';
        }
        return '';
    }
}