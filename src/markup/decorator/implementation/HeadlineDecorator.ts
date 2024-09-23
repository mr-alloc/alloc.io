import type IMarkdownDecorator from "@/markup/decorator/IMarkdownDecorator";
import MarkdownIt from "markdown-it";
import Token from "markdown-it/lib/token";
import Renderer from "markdown-it/lib/renderer";
import TokenNesting from "@/markup/constant/TokenNesting";
import {slugify} from "@/utils/StringUtils";

export default class HeadlineDecorator implements IMarkdownDecorator {

    private readonly KEY_OPEN = 'heading_open';

    decorate(markdownIt: MarkdownIt): void {
        const proxy = (tokens: Array<Token>, index: number, options: MarkdownIt.Options, env: any, self: Renderer) => self.renderToken(tokens, index, options);
        const defaultRule = markdownIt.renderer.rules[this.KEY_OPEN] || proxy;

        markdownIt.renderer.rules[this.KEY_OPEN] = (
            tokens: Array<Token>,
            index: number,
            options: MarkdownIt.Options,
            env: any,
            self: Renderer
        ): string => {
            const headline = tokens[index];
            //h2 > a > div > span
            headline.attrJoin('class', 'scroll-mt-[calc(48px+48px+var(--header-height))] lg:scroll-mt-[calc(48px+var(--header-height))]');
            const inlineOfHeadline = tokens[index +1];
            console.log('tokens', tokens);

            const linkOpen = new Token('link_open', 'a', TokenNesting.OPEN.value);
            linkOpen.attrJoin('aria-current', 'page');
            linkOpen.attrJoin('href', `#${slugify(inlineOfHeadline.content, false)}`);
            linkOpen.attrJoin('class', 'router-link-active router-link-exact-active group');
            linkOpen.level = 1;

            const inlineOfLink = new Token('inline', '', TokenNesting.SELF_CLOSE.value);
            inlineOfLink.content = inlineOfHeadline.content;
            inlineOfLink.level = 1;

            const linkClose = new Token('link_close', 'a', TokenNesting.CLOSE.value);
            linkClose.level = 1;

            inlineOfHeadline.children = [
                linkOpen,
                inlineOfLink,
                linkClose
            ]


            const divOpen = new Token('html_block', 'div', TokenNesting.OPEN.value);
            divOpen.attrJoin('class', '-ml-6 pr-2 py-2 inline-flex opacity-0 group-hover:lg:opacity-100 transition-opacity absolute');
            divOpen.level = 2;

            const inlineOfDiv = new Token('html_inline', '', TokenNesting.SELF_CLOSE.value);
            inlineOfDiv.level = 2;

            const divClose = new Token('html_block', 'div', TokenNesting.CLOSE.value);
            divClose.level = 2;

            inlineOfLink.children = [
                divOpen,
                inlineOfDiv,
                divClose
            ]


            return defaultRule(tokens, index, options, env , self);
        }
    }

}
