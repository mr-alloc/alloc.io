import type IMarkdownDecorator from "@/markup/decorator/IMarkdownDecorator";
import MarkdownIt from "markdown-it";
import Token from "markdown-it/lib/token";
import TemplateAttributes from "@/markup/template/TemplateAttributes";
import TemplateExpression from "@/markup/template/TemplateExpression";
import Renderer from "markdown-it/lib/renderer";


export default class ParagraphDecorator implements IMarkdownDecorator {
    private readonly KEY_OPEN = 'paragraph_open';
    decorate(markdownIt: MarkdownIt): void {
        const proxy = markdownIt.renderer.rules[this.KEY_OPEN];
        markdownIt.renderer.rules[this.KEY_OPEN] = (tokens: Array<Token>, index: number, options: MarkdownIt.Options, env: any, self: Renderer): string => {
            try {

                const inline = tokens[index + 1];
                if (inline.children) {
                    return this.decorateInline(tokens, index, inline);
                }
                return ''
            } catch (e) {
                return proxy ? proxy(tokens, index, options, env, self) : '';
            }
        }
    }

    private decorateInline(tokens: Array<Token>, index: number, inline: Token): string {
        const image = inline.children?.find(token => token.type === 'image');
        if (image) {
            return this.decorateImage(tokens, index, inline, image);
        }
        return '';
    }

    private decorateImage(tokens: Array<Token>, index: number, inline: Token, image: Token): string {
        const children = inline.children;
        const text = children?.[2]; // 1: br, 2: text
        if (!text) {
            throw new Error('Text text token not found');
        }
        const attributes = TemplateAttributes.parse(text.content);

        const map = attributes.toMap();
        console.log('map', map);

        if (map.has('description')) {
            inline.content = map.get('description')!;
        }
        throw new Error('Complete');
    }
}