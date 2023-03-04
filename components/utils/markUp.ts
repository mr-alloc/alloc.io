import lineNumbers from '~/components/utils/lineNumbers'
import preWrapper from '~/components/utils/preWrapper'
import highlightLines from '~/components/utils/highlightLines'


import prism from 'prismjs'
import escapeHtml from 'escape-html'



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
    if (!prism.languages[lang]) {
        try {
            require(`prismjs/components/prism-${lang}`)
        } catch (e) {
            console.warn('e => ',e)
        }
    }
    if (prism.languages[lang]) {
        const coded = prism.highlight(code, prism.languages[lang], lang)
        return wrap(coded, rawLang)
    }
    return wrap(code, 'text')
}

const markUp = (markdown: string) => {

    const md = require('markdown-it')({
        html: true,
        xhtmlOut: true,

        highlight: (code: string, lang: string) => {
            return highlight(code, lang)
        }
    })
    highlightLines(md)
    preWrapper(md)
    lineNumbers(md)


    return md.render(markdown)
}



export default markUp
