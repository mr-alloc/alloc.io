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

    return `<pre class="language-${lang} code-snippet"><code>${code}</code></pre>`
}

function getLangCodeFromExtension (extension: string): string {
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
        ['rs', 'rust']
    ])

    return extensionMap.get(extension) || extension
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

    lang = lang.toLowerCase()
    const rawLang = lang
    lang = getLangCodeFromExtension(lang)
    if ( ! Prism.languages[lang]) {
        PrismUtils.loadLanguage(lang)
    }
    if (Prism.languages[lang]) {
        const coded = Prism.highlight(code, Prism.languages[lang], lang)
        return wrap(coded, rawLang)
    }
    return wrap(code, 'text')
}
