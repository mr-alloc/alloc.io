import MarkdownIt from 'markdown-it'

export default (md: MarkdownIt) => {
    const wrap = (wrapped: Function) => (...args: any[]) => {
        const [tokens, idx] = args
        const token = tokens[idx]
        const rawCode = wrapped(...args)

        const lang = token.info
            ? token.info.trim()
            : 'text'


        return `<div class="language-${lang} extra-class">`
            + `<!--afterbegin-->${rawCode}<!--beforeend--></div>`
    }

    const { fence } = md.renderer.rules
    md.renderer.rules.fence = wrap(fence!)
}
