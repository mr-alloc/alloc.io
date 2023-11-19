import MarkdownIt from "markdown-it";
import Token from "markdown-it/lib/token";

export const tableOfContents = (markdown: MarkdownIt)  => {

    markdown.renderer.rules['heading_open'] = (tokens: Array<Token>, index: number): string => {
        const token = tokens[index]
        const contentToken = tokens[index + 1]

        let tag = token.tag
        let grade = parseInt(tag.replace('h', ''), 10)
        console.log('tag', tag, 'grade', grade)
        console.log('contentToken', contentToken)
        const level = tag.replace('h', '')
        return `<div class="headline-wrapper" data-title="${contentToken.content}" data-level="${grade}">
                    <${tag} id="">`
    }

    markdown.renderer.rules['heading_close'] = (tokens: Array<Token>, index: number): string => {
        const token = tokens[index]
        return `</${token.tag}></div>`
    }

}
