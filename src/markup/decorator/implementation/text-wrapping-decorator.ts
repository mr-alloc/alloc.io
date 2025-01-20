import type IMarkdownDecorator from "@/markup/decorator/i-markdown-decorator";
import MarkdownIt from "markdown-it";
import {findCloseIndex, findTokens} from "@/markup/utils/markdown-it-util";

export default class TextWrappingDecorator implements IMarkdownDecorator {

    private static readonly KEY_OPEN = 'text_wrapping_open';
    private static readonly KEY_CLOSE = 'text_wrapping_close';

    public decorate(markdownIt: MarkdownIt, isDebug?: boolean): void {
        markdownIt.renderer.rules[TextWrappingDecorator.KEY_OPEN] = (tokens, start): string => {
            const token = tokens[start];
            const option = token.meta['option'];
            const end = findCloseIndex(TextWrappingDecorator.KEY_CLOSE, tokens, start);
            const rangeTokens = tokens.slice(start + 1, end);

            const images = findTokens(rangeTokens, 'image');
            const floatClass = option['align'] === 'left' ? 'float-left' : 'float-right';
            images.forEach(image => {
                image.attrSet('data-text-wrapping', 'true');
                image.attrJoin('class', floatClass);
            });

            return '<div>';
        }

        markdownIt.renderer.rules[TextWrappingDecorator.KEY_CLOSE] = (tokens, index): string => {
            return '</div>';
        }
    }

}
