import Prism from "prismjs";
import * as PrismUtils from "@/utils/prismUtils";
import escapeHtml from "escape-html";
import MarkdownIt from "markdown-it";

const NEW_LINE = 0x0A; /* \n */
export const DEFAULT_MARKDOWN_IT_OPTIONS: MarkdownIt.Options = {
    html: true,
    xhtmlOut: true,

    highlight: highlight
}

function wrap(code: string, lang: string) {
    if(lang === 'text') {
        code = escapeHtml(code)
    }

    return `<pre class="language-${lang}"><code>${code}</code></pre>`
}

export function getLanguageCode (extension: string): string {
    const extensionMap = new Map<string, string>([
        ['vue', 'markup'],
        ['html', 'markup'],
        ['md', 'markdown'],
        ['rb', 'ruby'],
        ['ts', 'typescript'],
        ['py', 'python'],
        ['sh', 'bash'],
        ['yml', 'yaml'],
        ['styl', 'stylus'],
        ['kt', 'kotlin'],
        ['rs', 'rust'],
        ['js', 'javascript']
    ])

    return extensionMap.get(extension) || extension;
}

export function countNewline(src: string): number {
    if (!src) return 0;
    return Array.from(src)
        .filter((_, index) => src.codePointAt(index) === NEW_LINE).length;
}

export function countPerNewline(src: string): number {
    if (!src) return 0;
    return src.split(String.fromCharCode(NEW_LINE)).length;
}

export function highlight(code: string, lang: string) {
    if (!lang) {
        return wrap(code, 'text')
    }

    console.log('highlight lang:', lang);
    return wrap(code, lang);
}
