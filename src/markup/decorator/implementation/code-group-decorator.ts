import type IMarkdownDecorator from "@/markup/decorator/i-markdown-decorator";
import MarkdownIt from "markdown-it";
import Token from "markdown-it/lib/token";
import Renderer from "markdown-it/lib/renderer";
import {getLanguageCode} from "@/utils/markdown-utils";
import {findChildrenIndexes, findCloseIndex} from "@/markup/utils/markdown-it-util";
import CodeBlockTitle from "@/classes/implement/code-block-title";

export default class CodeGroupDecorator implements IMarkdownDecorator {

    public static readonly KEY_OPEN: string = 'code_group_open';
    public static readonly KEY_CLOSE: string = 'code_group_close';

    public decorate(markdownIt: MarkdownIt, isDebug: boolean = false): void {
        const proxy = (tokens: Array<Token>, index: number, options : MarkdownIt.Options, env: any, self: Renderer) => self.renderToken(tokens, index, options);
        const fallbackRule = markdownIt.renderer.rules[CodeGroupDecorator.KEY_OPEN] || proxy;

        markdownIt.renderer.rules[CodeGroupDecorator.KEY_OPEN] = (tokens: Array<Token>, index: number, options: MarkdownIt.Options, env: any, self: Renderer): string => {
            const endIndex = findCloseIndex(CodeGroupDecorator.KEY_CLOSE, tokens, index);

            const indexes = findChildrenIndexes(tokens, index, endIndex)
                .filter(tokenIndex => tokens[tokenIndex].type === 'fence');

            const buttons = this.generateButtons(indexes, tokens);

            //code-block-decorator에서 처리하기 위해 그룹 내 인덱스값을 넣어준다.
            indexes.forEach((tokenIndex, idx) => {
                const codeBlock = tokens[tokenIndex];
                codeBlock.attrSet('code-group-index', idx.toString());
                codeBlock.attrSet(`code-group-number`, index.toString())
            });

            return `<div class="relative [&>div:last-child]:!my-0 [&>div:last-child]:!static my-5">
                        <div class="code-group-${index}-buttons flex items-center gap-1 border border-gray-200 dark:border-gray-700 border-b-0 rounded-t-md overflow-x-auto p-2">
                            ${buttons}
                        </div>
                        <div class="code-group relative [&>pre]:!rounded-t-none [&>pre]:!my-0 my-5" id="code-group-${index}" data-group-number="${index}">
                            <button type="button" aria-label="Copy code to clipbloard" tabindex="-1" class="copy-button focus:outline-none focus-visible:outline-0 disabled:cursor-not-allowed disabled:opacity-75 aria-disabled:cursor-not-allowed aria-disabled:opacity-75 flex-shrink-0 font-medium rounded-md text-xs gap-x-1.5 p-1.5 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 underline-offset-4 hover:underline focus-visible:ring-inset focus-visible:ring-2 focus-visible:ring-primary-500 dark:focus-visible:ring-primary-400 inline-flex items-center absolute top-2.5 right-2.5">
                                <span class="iconify i-ph:copy flex-shrink-0 h-4 w-4" aria-hidden="true"></span>
                            </button>`;
        }
            markdownIt.renderer.rules[CodeGroupDecorator.KEY_CLOSE] = (tokens: Array<Token>, index: number, options: MarkdownIt.Options, env: any, self: Renderer): string => {
            return `</div></div>`;
        }
    }

    private generateButtons(tokenIndexes: Array<number>, tokens: Array<Token>): string {
        const activateClasses = 'bg-gray-100 dark:bg-gray-800';
        const deactivateClasses = 'hover:bg-gray-50 dark:hover:bg-gray-800/50';

        return tokenIndexes.map(index => tokens[index]).map((token, idx) => {
            //file 이름 형식 일경우에는 File.java 형식으로 표시
            //alias 형식일 경우에는 java::File.java 에서 File.java 형식으로 표시
            //+ java::출력메소드 에서 출력메소드로 표시
            const title = CodeBlockTitle.of(token.info);

            return `<button tabindex="-1" class="px-2 py-1.5 pr-10 focus:outline-none text-gray-700 dark:text-gray-200 text-sm rounded-md flex items-center gap-1.5 ${idx === 0 ? activateClasses : deactivateClasses}">
                        <span class="iconify i-vscode-icons:file-type-${getLanguageCode(title.language)} size-4" aria-hidden="true"></span>
                        <span class="whitespace-nowrap">${title.value}</span>  
                    </button>`;
        }).join('\n');
    }

}
