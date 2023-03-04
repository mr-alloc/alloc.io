import MarkdownIt from 'markdown-it'

export default (md: MarkdownIt) => {
    const fence = md.renderer.rules.fence
    md.renderer.rules.fence = (...args) => {
        const rawCode = fence?.apply(null, args)
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
}
