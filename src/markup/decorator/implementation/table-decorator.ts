import type IMarkdownDecorator from "@/markup/decorator/IMarkdownDecorator";
import MarkdownIt from "markdown-it";
import Token from "markdown-it/lib/token";
import Renderer from "markdown-it/lib/renderer";
import TemplateExpression from "@/markup/template/TemplateExpression";
import TemplateAttributes from "@/markup/template/TemplateAttributes";
import StyleDecorator from "@/markup/decorator/style/style-decorator";

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
            try {
                const closeIndex = this.getCloseIndex(tokens, index, 'table');
                const tableOpenToken = tokens[index];
                // console.debug(`table(${index}, ${closeIndex}) `, tokens);

                let templateIndex = tokens.slice(index, closeIndex)
                    .findIndex(token => TemplateExpression.test(token.content));
                if (templateIndex === -1) {
                    tokens[closeIndex].meta = {
                        'no-wrap': true
                    };
                    return this.getFallbackWrapper([]);
                }
                templateIndex += index;
                const realTemplateToken = tokens[templateIndex];
                const templateToken = Object.assign({}, realTemplateToken);
                //템플릿 옵션을 그대로 랜더링한다면 테이블 로우가 생성되기 떄문에 tr_open ~ tr_close 까지 삭제해야한다.
                const trOpenIndex = templateIndex -2;
                realTemplateToken.children = [];
                const trCloseIndex = this.getCloseIndex(tokens, trOpenIndex, 'tr');
                const count = trCloseIndex - trOpenIndex;

                [...new Array(count)].forEach((_, i) => {
                    tokens[trOpenIndex + i].hidden = true;
                });

                const attributes = TemplateAttributes.parse(templateToken.content);
                const desc = attributes.description;

                const styleDecorator = StyleDecorator.getInstance();
                styleDecorator.apply(tableOpenToken, attributes.toMap());

                const classes = tableOpenToken.meta.wrapperClasses;
                return (
                    this.getFallbackWrapper([...attributes.wrapperClass.split(' '), classes]) + `<caption class="text-gray-300 text-sm">${desc}</caption>`
                );
            } catch (skip) {}
            return this.getFallbackWrapper([]);
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

    private getFallbackWrapper(additionalWrapperClasses: Array<string>) {
        const wrapperClasses = ['flex', 'flex-col', 'overflow-x-auto'].concat(additionalWrapperClasses).join(' ');
        return `<div class="${wrapperClasses}"><table class="table-fixed w-max">`;
    }
}
