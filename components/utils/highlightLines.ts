// Modified from https://github.com/egoist/markdown-it-highlight-lines
import MarkdownIt from 'markdown-it'

const RE = /{([\d,-]+)}/
const wrapperRE = /^<pre .*?><code>/

export default (md: MarkdownIt) => {
    const fence = md.renderer.rules.fence
    // @ts-ignore
    md.renderer.rules.fence = (...args) => {
        const [tokens, idx, options] = args
        const token = tokens[idx]

        // @ts-ignore
        if (!token.lineNumber) {
            const rawInfo = token.info
            if (!rawInfo || !RE.test(rawInfo)) {
                return fence?.apply(null, args)
            }

            const langName = rawInfo.replace(RE, '').trim()
            // ensure the next plugin get the correct lang.
            token.info = langName
            const executed: RegExpExecArray = RE.exec(rawInfo)!

            // @ts-ignore
            token.lineNumbers = executed[1]
                .split(',')
                .map(v => v.split('-').map(v => parseInt(v, 10)))

        }


        const code = options.highlight
            ? options.highlight(token.content, token.info, '')
            : token.content

        const rawCode = code.replace(wrapperRE, '')
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

        const highlightLinesWrapperCode
            = `<div class="highlight-lines">${highlightLinesCode}</div>`

        return code + highlightLinesWrapperCode
    }
}
