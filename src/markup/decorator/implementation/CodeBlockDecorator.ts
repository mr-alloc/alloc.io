import type IMarkdownDecorator from "@/markup/decorator/IMarkdownDecorator";
import MarkdownIt from "markdown-it";
import Token from "markdown-it/lib/token";
import Renderer, {type RenderRule} from "markdown-it/lib/renderer";

export default class CodeBlockDecorator implements IMarkdownDecorator {

    private readonly _number = /{([\d,-]+)}/
    private readonly _wrapper = /^<pre .*?><code>/

    public decorate(markdownIt: MarkdownIt): void {
        const proxy = (tokens: Array<Token>, index: number, options: MarkdownIt.Options, env: any, self: Renderer) => self.renderToken(tokens, index, options);
        const defaultFence = markdownIt.renderer.rules.fence || proxy;
        // @ts-ignore
        this.decorateHighlighting(markdownIt, defaultFence);
    }

    private decorateHighlighting(markdownIt: MarkdownIt, defaultFence: Renderer.RenderRule) {
        markdownIt.renderer.rules.fence = (
            tokens: Array<Token>,
            index: number,
            options: MarkdownIt.Options,
            env: any,
            self: Renderer
        ): string => {
            const token = tokens[index];

            // @ts-ignore
            if (!token.lineNumber) {
                const rawInfo = token.info
                if (!rawInfo || !this.numberRE.test(rawInfo)) {
                    return defaultFence(tokens, index, options, env, self);
                }

                // ensure the next plugin get the correct lang.
                token.info = rawInfo.replace(this.numberRE, '').trim();
                const executed: RegExpExecArray = this.numberRE.exec(rawInfo)!

                // @ts-ignore
                token.lineNumbers = executed[1]
                    .split(',')
                    .map(v => v.split('-').map(v => parseInt(v, 10)))

            }


            const code = options.highlight
                ? options.highlight(token.content, token.info, '')
                : token.content

            const rawCode = code.replace(this.wrapperRe, '')
            const highlightLinesCode = rawCode.split('\n').map((split: string, index: number) => {
                const lineNumber = index + 1
                // @ts-ignore
                const inRange = token.lineNumbers.some(([start, end]: number[]) => {
                    if (start && end) {
                        return lineNumber >= start && lineNumber <= end
                    }
                    return lineNumber === start
                })
                if (inRange) {
                    return `<div class="highlighted">&nbsp;</div>`
                }
                return '<br>'
            }).join('')
            const lang = token.info ? token.info.trim() : 'text';
            const highlightLinesWrapperCode
                = `<div class="highlight-lines">${highlightLinesCode}</div>`

            const finalCode = `<div class="language-${lang} extra-class">
                        <!--afterbegin-->
                        ${code + highlightLinesWrapperCode}
                        <!--beforeend-->
                    </div>`

            return this.decorateLineNumbers(finalCode);
        }
    }

    private decorateLineNumbers(rawCode: string) {
        const code = rawCode?.slice(
            rawCode.indexOf('<code>'),
            rawCode.indexOf('</code>')
        )

        const lines = code?.split('\n')!
        const lineNumbersCode = [...Array(lines.length - 1)]
            .map(() => `<div class="line-number"></div>`).join('')

        const lineNumbersWrapperCode
            = `<div class="line-numbers-wrapper" aria-hidden="true">${lineNumbersCode}</div>`
        const finalCode = rawCode!
            .replace('<!--beforeend-->', `${lineNumbersWrapperCode}<!--beforeend-->`)
            .replace('extra-class', 'line-numbers-mode')

        return finalCode
    }

    get numberRE(): RegExp {
        this._number.lastIndex = 0;
        return this._number;
    }

    get wrapperRe(): RegExp {
        this._wrapper.lastIndex = 0;
        return this._wrapper;
    }
}
