import lineNumbers from '~/utils/lineNumbers'
import preWrapper from '~/utils/preWrapper'
import highlightLines from '~/utils/highlightLines'

import ruleSub from '~/utils/ruleSub'
import escapeHtml from 'escape-html'
import MarkdownIt from 'markdown-it'
import Prism from 'prismjs'
import { tableOfContents } from '~/utils/tableOfContents'
import * as PrismUtils from './prismUtils'
import {PostContent} from "~/class/implement/PostContent";

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

function highlight (code: string, lang: string) {
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

export default (markdown: string, postMeta?: PostContent) => {
    const md = new MarkdownIt({
        html: true,
        xhtmlOut: true,

        highlight: (code: string, lang: string) => {
            return highlight(code, lang)
        }
    })

    highlightLines(md)
    preWrapper(md)
    lineNumbers(md)
    ruleSub(md)
    postMeta && tableOfContents(md, postMeta)

    return md.render(markdown)
}
