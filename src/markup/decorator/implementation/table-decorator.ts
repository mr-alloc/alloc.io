import type IMarkdownDecorator from "@/markup/decorator/IMarkdownDecorator";
import MarkdownIt from "markdown-it";
import Token from "markdown-it/lib/token";
import Renderer from "markdown-it/lib/renderer";
import TemplateExpression from "@/markup/template/TemplateExpression";
import {fa} from "cronstrue/dist/i18n/locales/fa";
import TemplateAttributes from "@/markup/template/TemplateAttributes";

export default class TableDecorator implements IMarkdownDecorator {

    private readonly KEY_OPEN = 'table_open';
    private readonly KEY_CLOSE = 'table_close';

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
            const original = Object.assign({}, tokens);
            const tableRange = tokens.slice(index, tokens.length);
            const closeIndex = this.getCloseIndex(tokens, index, 'table');

            let templateIndex = tableRange.slice(index, closeIndex)
                .findIndex(token => TemplateExpression.test(token.content));
            if (templateIndex === -1) {
                return fallbackRule(tokens, index, options, env, self);
            }
            templateIndex += index;
            const realTemplateIndex = templateIndex + index;
            const realTemplateToken = tokens[realTemplateIndex];
            const templateToken = Object.assign({}, realTemplateToken);
            //템플릿 옵션을 그대로 랜더링한다면 테이블 로우가 생성되기 떄문에 tr_open ~ tr_close 까지 삭제해야한다.
            const trOpenIndex = realTemplateIndex -2;
            realTemplateToken.children = [];
            const trCloseIndex = this.getCloseIndex(tokens, trOpenIndex, 'tr');
            const count = trCloseIndex - trOpenIndex;

            [...new Array(count)].forEach((_, i) => {
                tokens[trOpenIndex + i].hidden = true;
            });

            const attributes = TemplateAttributes.parse(templateToken.content);
            const desc = attributes.description;
            return (
                `<div class="flex flex-col ${attributes.wrapperClass}">
                    <table class="table-fixed w-max">
                    <caption class="text-gray-300 text-sm">${desc}</caption>`
            );
        }

        markdownIt.renderer.rules[this.KEY_CLOSE] = (
            tokens: Array<Token>,
            index: number,
            options: MarkdownIt.Options,
            env: any,
            self: Renderer
        ): string => {
            return (
                `</table></div>`
            );
        }
    }

    private getCloseIndex(tokens: Array<Token>, openIndex: number, closeType: string): number {
        return tokens.slice(openIndex, tokens.length).findIndex(token => token.type === (closeType + '_close')) + openIndex;
    }
}