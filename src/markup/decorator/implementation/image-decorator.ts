import type IMarkdownDecorator from "@/markup/decorator/i-markdown-decorator";
import MarkdownIt from "markdown-it";
import Token from "markdown-it/lib/token";
import TemplateAttributes from "@/markup/template/TemplateAttributes";
import Renderer from "markdown-it/lib/renderer";
import StyleDecorator from "@/markup/decorator/style/style-decorator";


export default class ImageDecorator implements IMarkdownDecorator {

    private readonly KEY_OPEN = 'paragraph_open';
    private readonly KEY_CLOSE = 'paragraph_close';

    private readonly ATTR_INNER_ALIGN = 'align';


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
            const wrapperClasses = ['flex', 'flex-col', 'not-prose', 'w-full'];
            try {
                const inline = tokens[index +1];
                inline.content = '';
                const imageToken = this.findChild(inline.children, 'image');
                if (!imageToken) {
                    //<p>
                    return fallbackRule(tokens, index, options, env, self);
                }

                const templateToken = this.findChild(inline.children, 'text');
                if (!templateToken) {
                    throw new Error('template token not found with inline children');
                }

                const attributes = TemplateAttributes.parse(templateToken.content).toMap();

                imageToken.attrJoin('data-description', attributes.get('description') ?? '');
                templateToken.content = '';

                this.addDefaultImageClass(imageToken);

                const styleDecorator = StyleDecorator.getInstance();
                styleDecorator.apply(imageToken, attributes);
                wrapperClasses.push(imageToken.meta.wrapperClasses);
            } catch (skip) {
                isDebug && console.error('[decorator]image:start error: ', skip);
            }
            return `<div class="${wrapperClasses.join(' ')}">
                       <a href="#" class="my-2 inline-flex">`;
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
                if (!imageToken) {
                    return fallbackRule(tokens, index, options, env, self);
                }
                if (imageToken.attrGet('data-description') === null) {
                    return `</a></div>`
                }

                return (
                    `</a>
                   <figcaption class="m-0 text-center text-sm text-gray-600 dark:text-gray-400 w-full">${imageToken.attrGet('data-description')}</figcaption>
                 </div>`
                );
            } catch(skip) {
                isDebug && console.error('[decorator]image:close error: ', skip);
            }
            return `</a></div>`;
        }
    }

    private findChild(children: Token[] | null, inlineName: string): Token | undefined {
        return children?.find((token) => token.type === inlineName)
    }

    private addDefaultImageClass(imageToken: Token) {
        imageToken.attrJoin('class', 'my-0 rounded-md');
        imageToken.attrJoin('style', 'cursor: zoom-in;');
    }

}
