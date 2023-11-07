import MarkdownIt from "markdown-it";
import Token from "markdown-it/lib/token";
import {TocNode} from "~/class/implement/TocNode";

export const tableOfContents = (markdown: MarkdownIt)  => {

    markdown.renderer.rules['heading_open'] = (tokens: Array<Token>, index: number): string => {
        const token = tokens[index]
        const contentToken = tokens[index + 1]

        let tag = token.tag
        let grade = parseInt(tag.replace('h', ''), 10)
        let tocNode = new TocNode(grade, contentToken.content)
        const level = tag.replace('h', '')
        return `<div class="headline-wrapper" data-title="${contentToken.content}" data-level="${grade}">
                    <${tag} id="${tocNode.fragmentId}">`
    }

    markdown.renderer.rules['heading_close'] = (tokens: Array<Token>, index: number): string => {
        const token = tokens[index]
        return `</${token.tag}></div>`
    }

}
