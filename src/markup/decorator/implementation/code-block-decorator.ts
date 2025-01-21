import type IMarkdownDecorator from "@/markup/decorator/i-markdown-decorator";
import MarkdownIt from "markdown-it";
import Token from "markdown-it/lib/token";
import Renderer from "markdown-it/lib/renderer";
import Filename from "@/classes/implement/filename";
import {getLanguageCode} from "@/utils/markdown-utils";
import type {RendererRuleArguments} from "@/markup/decorator/rederer-rule";
import {useCodeGroupStore} from "@/store/code-group-store";
import CodeBlockTitle from "@/classes/implement/code-block-title";
import FileAlias from "@/classes/implement/file-alias";
import {useMermaidDiagramStore} from "@/store/mermaid-diagram-store";

export default class CodeBlockDecorator implements IMarkdownDecorator {

    private readonly _number = /{([\d,-]+)}/;
    private readonly _wrapper = /^<pre .*?><code>/;

    public decorate(markdownIt: MarkdownIt, isDebug: boolean = false): void {
        const proxy = (tokens: Array<Token>, index: number, options: MarkdownIt.Options, env: any, self: Renderer) => self.renderToken(tokens, index, options);
        const defaultFence = markdownIt.renderer.rules.fence || proxy;

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
            const name = token.info;
            if (name === 'mermaid') {
                return this.decorateMermaid(token, {tokens, index, options, env, self});
            }

            if (token.attrIndex('code-group-index') >= 0) {
                return this.decorateCodeGroup(token, {tokens, index, options, env, self});
            }

            // @ts-ignore
            if (!token.lineNumber) {
                const rawInfo = token.info

                if (FileAlias.isAlias(rawInfo) || Filename.isFilename(rawInfo)) {
                    const title = CodeBlockTitle.of(rawInfo);
                    return this.filenameFence(title, tokens, index, options, env, self);
                }

                if (!rawInfo || !this.numberRE.test(rawInfo)) {
                    return this.languageFence(tokens, index, options, env, self);
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
            const lang = token.info ? token.info.trim() : 'text'

            return `<div class="relative language-${lang} extra-class">
                        <!--afterbegin-->
                        ${code}
                        <!--beforeend-->
                    </div>`;
        }
    }

    private decorateMermaid(token: Token, args: RendererRuleArguments): string {
        //클라이언트에서 처리를 위해 렌더링만 해준다.
        const mermaidStore = useMermaidDiagramStore();
        mermaidStore.addDiagram(args.index, token.content);
        return `<pre class="mermaid" data-mermaid-id="${args.index}" class="mermaid overflow-auto max-w-full max-h-96">Diagram Loading...</pre>`;
    }

    private decorateHighlightLines(token: Token, lang: string, rawCode: string): string {
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
        }).join('');

        return `<div class="highlight-lines">${highlightLinesCode}</div>`;
    }

    private decorateLineNumbers(rawCode: string): string {
        const code = rawCode?.slice(
            rawCode.indexOf('<code>'),
            rawCode.indexOf('</code>')
        )

        const lines = code?.split('\n')!;
        const lineNumbersCode = [...Array(lines.length - 1)]
            .map(() => `<div class="line-number"></div>`).join('');

        const lineNumbersWrapperCode
            = `<div class="line-numbers-wrapper" aria-hidden="true">${lineNumbersCode}</div>`
        return rawCode
            .replace('<!--beforeend-->', `${lineNumbersWrapperCode}<!--beforeend-->`)
            .replace('extra-class', 'line-numbers-mode');
    }

    private filenameFence(title: CodeBlockTitle, tokens: Array<Token>, index: number, options: MarkdownIt.Options, env: any, self: Renderer): string {
        const token = tokens[index];

        return `<div class="relative [&>pre]:!rounded-t-none [&>pre]:!my-0 my-5">
                    <div class="flex items-center gap-1.5 border border-gray-200 dark:border-gray-700 border-b-0 relative rounded-t-md px-4 py-3 not-prose">
                        <span class="iconify i-vscode-icons:file-type-${getLanguageCode(title.language)}"></span>
                        <span class="text-gray-700 dark:text-gray-200 text-sm/6">${title.value}</span>
                    </div>
                    <button type="button" aria-label="Copy file code to clipbloard" tabindex="-1" class="copy-button focus:outline-none focus-visible:outline-0 disabled:cursor-not-allowed disabled:opacity-75 aria-disabled:cursor-not-allowed aria-disabled:opacity-75 flex-shrink-0 font-medium rounded-md text-xs gap-x-1.5 p-1.5 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 underline-offset-4 hover:underline focus-visible:ring-inset focus-visible:ring-2 focus-visible:ring-primary-500 dark:focus-visible:ring-primary-400 inline-flex items-center absolute top-2.5 right-2.5">
                        <span class="iconify i-ph:copy flex-shrink-0 h-4 w-4" aria-hidden="true"></span>
                    </button>
                    ${options.highlight?.(token.content, getLanguageCode(title.language), '')}
               </div>`
    }

    private languageFence(tokens: Array<Token>, index: number, options: MarkdownIt.Options, env: any, self: Renderer): string {
        const token = tokens[index];
        const lang = getLanguageCode(token.info);

        return `<div class="relative">
                    <button type="button" aria-label="Copy code to clipbloard" tabindex="-1" data-code-index="${index}"
                        class="copy-button focus:outline-none focus-visible:outline-0 disabled:cursor-not-allowed disabled:opacity-75 aria-disabled:cursor-not-allowed aria-disabled:opacity-75 flex-shrink-0 font-medium rounded-md text-xs gap-x-1.5 p-1.5 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 underline-offset-4 hover:underline focus-visible:ring-inset focus-visible:ring-2 focus-visible:ring-primary-500 dark:focus-visible:ring-primary-400 inline-flex items-center absolute top-2.5 right-2.5">
                        <span class="iconify i-ph:copy flex-shrink-0 h-4 w-4" aria-hidden="true"></span>
                    </button>
                    ${options.highlight?.(token.content, lang, '')}
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

    private decorateCodeGroup(token: Token, args: RendererRuleArguments) {
        const groupIndex = parseInt(token.attrGet('code-group-index')!, 10);
        const title = CodeBlockTitle.of(token.info);
        const code = args.options.highlight?.(token.content, getLanguageCode(title.language), '');

        useCodeGroupStore().addCodeGroup(token.attrGet('code-group-number')!, title.value, code);
        if (groupIndex === 0) {
            return code
        }

        //두번째 렌더링부터는 코드를 바로 렌더링 하지않는다.
        return "";
    }
}
