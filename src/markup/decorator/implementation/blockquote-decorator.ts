import type IMarkdownDecorator from "@/markup/decorator/i-markdown-decorator";
import MarkdownIt from "markdown-it";
import TemplateAttributes from "@/markup/template/TemplateAttributes";
import Token from "markdown-it/lib/token";
import Renderer from "markdown-it/lib/renderer";
import {countNewline} from "@/utils/MarkdownUtils";
import PromptIcon from "@/markup/constant/prompt-icon";
import PromptType from "@/markup/constant/prompt-type";

export default class BlockquoteDecorator implements IMarkdownDecorator {

    private readonly KEY_OPEN = 'blockquote_open';

    public constructor() {}

    public decorate(markdownIt: MarkdownIt): void {
        const proxy = (tokens: Array<Token>, index: number, options: MarkdownIt.Options, env: any, self: Renderer) => self.renderToken(tokens, index, options);
        const fallbackRule = markdownIt.renderer.rules[this.KEY_OPEN] || proxy;

        markdownIt.renderer.rules[this.KEY_OPEN] = (
            tokens: Array<Token>,
            index: number,
            options: MarkdownIt.Options,
            env: any,
            self: Renderer
        ): string => {
            const inline = tokens[index +2];
            const blockquoteOpen = tokens[index];
            const blockquoteClose = tokens[index +4];
            const paragraphOpen = tokens[index +1];
            const paragraphClose = tokens[index +3];

            this.changeTag(blockquoteOpen, paragraphOpen, paragraphClose, blockquoteClose);

            // inline position <-> span
            tokens[index +3] = inline;
            tokens[index +2] = paragraphClose;

            const template = TemplateAttributes.parse(inline.content);
            if (inline.children) {
                const count = countNewline(template.origin) * 2 +1; /* 각 라인 + 라인피드 개수*/
                inline.children = inline.children.slice(0, inline.children.length - count);
            }
            inline.content = template.text;
            //decorate each style for options.
            this.decorateStyle(blockquoteOpen, paragraphOpen, template);
            return fallbackRule(tokens, index, options, env, self);
        }
    }

    private changeTag(blockquoteOpen: Token, paragraphOpen: Token, paragraphClose: Token, blockquoteClose: Token) {
        blockquoteOpen.tag = 'div';
        paragraphOpen.tag = 'span';
        paragraphClose.tag = 'span';
        blockquoteClose.tag = 'div';
    }

    private decorateStyle(blockquoteOpen: Token, paragraphOpen: Token, template: TemplateAttributes) {
        //style for div
        blockquoteOpen.attrJoin('class', 'block pl-4 pr-6 py-3 rounded-md border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-sm/6 my-5 last:mb-0 group relative prose-code:bg-white dark:prose-code:bg-gray-900 font-medium');
        if (template.hasType() && PromptType.includes(template.type)) {
            blockquoteOpen.attrJoin('class', `_${template.type} dark\:${template.type}`);
        }

        //style for icon.
        if (template.hasIcon() && PromptIcon.includes(template.icon)) {
            paragraphOpen.attrJoin('class', `iconify i-ph:${template.icon}`);
        }
        paragraphOpen.attrJoin('class', 'w-4 h-4 mr-2 inline-flex items-center align-sub text-[--color-light] dark:text-[--color-dark]');
    }
}
