import type IMarkdownDecorator from "@/markup/decorator/IMarkdownDecorator";
import MarkdownIt from "markdown-it";
import Token from "markdown-it/lib/token";
import Renderer from "markdown-it/lib/renderer";
import Filename from "@/classes/implement/Filename";
import {getLanguageCode} from "@/utils/MarkdownUtils";

export default class CodeBlockDecorator implements IMarkdownDecorator {

    private readonly _number = /{([\d,-]+)}/;
    private readonly _wrapper = /^<pre .*?><code>/;

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

                if (Filename.isFilename(rawInfo)) {
                    return this.filenameFence(tokens, index, options, env, self);
                }

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

            //Highlight for each languages.
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
                });
                if (inRange) {
                    return `<div class="highlighted">&nbsp;</div>`
                }
                return '<br>'
            }).join('')
            const lang = token.info ? token.info.trim() : 'text';
            const highlightLinesWrapperCode = `<div class="highlight-lines">${highlightLinesCode}</div>`

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

    private filenameFence(tokens: Array<Token>, index: number, options: MarkdownIt.Options, env: any, self: Renderer): string {
        const token = tokens[index];
        const filename = new Filename(token.info);
        const code = options.highlight
            ? options.highlight(token.content, getLanguageCode(filename.ext), '')
            : token.content;

        return `<div class="relative [&>pre]:!rounded-t-none [&>pre]:!my-0 my-5">
                    <div class="flex items-center gap-1.5 border border-gray-200 dark:border-gray-700 border-b-0 relative rounded-t-md px-4 py-3 not-prose">
                        <span class="iconify i-vscode-icons:file-type-vue"></span>
                        <span class="text-gray-700 dark:text-gray-200 text-sm/6">${token.info}</span>
                    </div>
                    <button type="button" aria-label="Copy code to clipbloard" tabindex="-1" class="focus:outline-none focus-visible:outline-0 disabled:cursor-not-allowed disabled:opacity-75 aria-disabled:cursor-not-allowed aria-disabled:opacity-75 flex-shrink-0 font-medium rounded-md text-xs gap-x-1.5 p-1.5 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 underline-offset-4 hover:underline focus-visible:ring-inset focus-visible:ring-2 focus-visible:ring-primary-500 dark:focus-visible:ring-primary-400 inline-flex items-center absolute top-2.5 right-2.5">
                        <span class="iconify i-ph:copy flex-shrink-0 h-4 w-4" aria-hidden="true"></span>
                    </button>
                    ${code}
               </div>`
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
