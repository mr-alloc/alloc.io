import type IMarkdownDecorator from "@/markup/decorator/i-markdown-decorator";
import MarkdownIt from "markdown-it";
import Token from "markdown-it/lib/token";
import Renderer from "markdown-it/lib/renderer";
import {findChildrenIndexes, findCloseIndex, findTokens} from "@/markup/utils/markdown-it-util";

export default class ImageGroupDecorator implements IMarkdownDecorator {

    public static readonly KEY_OPEN = 'image_group_open';
    public static readonly KEY_CLOSE = 'image_group_close';

    public decorate(markdownIt: MarkdownIt, isDebug: boolean = false): void {
        const proxy = (tokens: Array<Token>, index: number, options : MarkdownIt.Options, env: any, self: Renderer) => self.renderToken(tokens, index, options);
        const fallbackRule = markdownIt.renderer.rules[ImageGroupDecorator.KEY_OPEN] || proxy;

        markdownIt.renderer.rules[ImageGroupDecorator.KEY_OPEN] = (tokens: Array<Token>, start: number, options: MarkdownIt.Options, env: any, self: Renderer): string => {
            const end = findCloseIndex(ImageGroupDecorator.KEY_CLOSE, tokens, start);
            const children = findChildrenIndexes(tokens, start, end).map(index => tokens[index]);

            const images = findTokens(children, 'image');
            images.forEach((token, index) => {
               token.attrSet('group-index', start.toString());
               token.attrSet('image-number', (index +1).toString());
               token.attrSet('group-image-count', images.length.toString());
            });
            const direction = images.length === 4 ? 'flex-col' : 'flex-row';
            return `<div class="flex h-64 sm:h-80 md:h-112 rounded-2xl overflow-hidden shadow-xl ${direction}">`;
        }
    }


}
