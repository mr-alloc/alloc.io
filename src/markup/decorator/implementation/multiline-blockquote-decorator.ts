import type IMarkdownDecorator from "@/markup/decorator/i-markdown-decorator";
import MarkdownIt from "markdown-it";
import TemplateAttributes from "@/markup/template/TemplateAttributes";
import Token from "markdown-it/lib/token";
import Renderer from "markdown-it/lib/renderer";
import {findCloseIndex} from "@/markup/utils/markdown-it-util";
import PromptType from "@/markup/constant/prompt-type";

export default class MultilineBlockquoteDecorator implements IMarkdownDecorator {

    private readonly KEY_OPEN = 'blockquote_open';
    private readonly KEY_CLOSE = 'blockquote_close';

    public constructor() {
    }

    public decorate(markdownIt: MarkdownIt, isDebug: boolean = false): void {
        const proxy = (tokens: Array<Token>, index: number, options: MarkdownIt.Options, env: any, self: Renderer) => self.renderToken(tokens, index, options);
        const fallbackRule = markdownIt.renderer.rules[this.KEY_OPEN] || proxy;

        markdownIt.renderer.rules[this.KEY_OPEN] = (
            tokens: Array<Token>,
            index: number,
            options: MarkdownIt.Options,
            env: any,
            self: Renderer
        ): string => {
            const closeIndex = findCloseIndex(this.KEY_CLOSE, tokens, index);
            const subSet = tokens.slice(index + 1, closeIndex);
            const groups = this.separateSubsetByParagraph(subSet, index + 1);
            //상태 1. blockquote 하위에 fence가 있다면 템플릿 속성이 무시되어 다른 문단으로 취급됨.
            //상태 2. inline 문자열에 개행이 있더라도, 한개의 문단으로 처리됨.
            const template = this.extractTemplateAttribute(groups, tokens);
            const openTag = this.renderWrapper(tokens[index], tokens[closeIndex], template);
            this.renderGroups(groups, tokens, template);

            return openTag
        }
    }

    public separateSubsetByParagraph(subset: Array<Token>, start: number): Array<Array<number>> {
        const separated = new Array<Array<number>>();
        let isOpen = false;
        let currentGroupNumber = 0;
        for (let i = 0; i < subset.length; i++) {
            const globalIndex: number = start + i;
            const token = subset[i];
            /* fence는 단독처리. */
            if (token.type === 'fence') {
                separated.push([globalIndex]);
                currentGroupNumber++;
            } else if (isOpen) {
                const group = separated[currentGroupNumber];
                group.push(globalIndex);
                if (token.type === 'paragraph_close') {
                    isOpen = false;
                    currentGroupNumber++;
                }
            } else if (!isOpen && token.type === 'paragraph_open') {
                isOpen = true;
                separated.push([globalIndex]);
            } else {
                throw new Error('Token has invalid state: ' + token);
            }
        }

        return separated;
    }

    private renderGroups(groups: Array<Array<number>>, tokens: Array<Token>, template: TemplateAttributes) {
        const withoutLast = groups.length === 1
            ? groups
            : groups.filter((_, index) => groups.length - 1 > index);
        for (const group of withoutLast) {
            const startToken = tokens[group[0]];
            const endToken = tokens[group[group.length - 1]];

            startToken.tag = 'span';
            endToken.tag = 'span';
        }


        const lastGroup = groups[groups.length - 1];
        if (!lastGroup || lastGroup.length != 3) {
            return;
        }

        const groupStartToken = tokens[lastGroup[0]];
        groupStartToken.tag = 'span';
        const groupEndToken = tokens[lastGroup[2]];
        groupEndToken.tag = 'span';
    }

    private renderWrapper(open: Token, close: Token, template: TemplateAttributes): string {
        open.tag = 'div';
        const wrapper = 'block pl-4 pr-6 py-3 rounded-md border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-sm/6 my-5 last:mb-0 group relative prose-code:bg-white dark:prose-code:bg-gray-900 font-medium'
            .split(' ');
        const inner = 'w-4 h-4 mr-2 inline-flex items-center align-sub text-[--color-light] dark:text-[--color-dark]'
            .split(' ');

        if (template.hasType() && PromptType.includes(template.type)) {
            wrapper.push(`_${template.type}`, `dark\:${template.type}`);
            inner.push('iconify', `i-ph:${template.icon}`)
        }

        close.tag = 'div';
        return (
            `<div class="${wrapper.join(' ')}"><span class="${inner.join(' ')}"></span>`
        )
    }

    private extractTemplateAttribute(groups: Array<Array<number>>, tokens: Array<Token>): TemplateAttributes {
        const fallback = TemplateAttributes.parse(':{}');
        if (groups.length == 0) {
            return fallback;
        }

        const lastGroup = groups[groups.length - 1];
        if (!lastGroup || lastGroup.length != 3) {
            return fallback;
        }

        //<p>, template, </p>
        tokens[lastGroup[0]].hidden = true;
        tokens[lastGroup[2]].hidden = true;
        const templateGroup = tokens[lastGroup[1]];
        if (!templateGroup.children) {
            return fallback;
        }

        const templateToken = templateGroup.children[templateGroup.children.length - 1];
        const templateString = templateToken.content;
        templateToken.content = '';

        return TemplateAttributes.parse(templateString);
    }
}
