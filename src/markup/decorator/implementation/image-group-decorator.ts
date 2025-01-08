import type IMarkdownDecorator from "@/markup/decorator/i-markdown-decorator";
import MarkdownIt from "markdown-it";
import Token from "markdown-it/lib/token";
import Renderer from "markdown-it/lib/renderer";
import {TokenNesting} from "@/markup/constant/token-nesting";

export default class ImageGroupDecorator implements IMarkdownDecorator {

    public static readonly KEY_OPEN = 'image_group_open';
    public static readonly KEY_CLOSE = 'image_group_close';

    public decorate(markdownIt: MarkdownIt, isDebug: boolean = false): void {
        const proxy = (tokens: Array<Token>, index: number, options : MarkdownIt.Options, env: any, self: Renderer) => self.renderToken(tokens, index, options);
        const fallbackRule = markdownIt.renderer.rules[ImageGroupDecorator.KEY_OPEN] || proxy;

        markdownIt.renderer.rules[ImageGroupDecorator.KEY_OPEN] = (tokens: Array<Token>, index: number, options: MarkdownIt.Options, env: any, self: Renderer): string => {
            const startToken = tokens[index];
            const range = tokens.slice(index, tokens.length);
            const endIndex = range.findIndex(token => token.type === ImageGroupDecorator.KEY_CLOSE);

            if (endIndex === -1) {
                console.error('not found end token');
                return '';
            }

            const endToken = tokens[endIndex];

            const firstParagraphIndex = tokens.slice(index + 1, endIndex).findIndex(token => token.type === 'paragraph_open');
            if (firstParagraphIndex === -1) {
                console.error('not found first paragraph');
                return fallbackRule(tokens, index, options, env, self);
            }

            const lastParagraphIndex = tokens.slice(index + 1, endIndex).findLastIndex(token => token.type === 'paragraph_close');
            if (lastParagraphIndex === -1) {
                console.error('not found last paragraph');
                return fallbackRule(tokens, index, options, env, self);
            }

            //인덱스 변경으로 인해 뒤에서 부터 추가
            tokens.splice(lastParagraphIndex, 0, new Token('', 'div', TokenNesting.CLOSE));
            tokens.splice(firstParagraphIndex, 0, new Token('', 'div', TokenNesting.OPEN));

            return self.renderToken(tokens, index, options);
        }
    }

}