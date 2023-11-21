import MarkdownIt from "markdown-it";
import Token from "markdown-it/lib/token";
import {slugify} from "./settingUtils";
import {PostContent} from "~/class/implement/PostContent";

export const tableOfContents = (markdown: MarkdownIt, postMeta: PostContent)  => {

    markdown.renderer.rules['heading_open'] = (tokens: Array<Token>, index: number): string => {
        const token = tokens[index]
        const contentToken = tokens[index + 1]

        let tag = token.tag
        let grade = parseInt(tag.replace('h', ''), 10)
        const slug = slugify(contentToken.content, false)
        return `<${tag} id="${slug}">
                    <a href="${postMeta.path}#${slug}" aria-current="page">
                        <div class="headline-wrapper" data-title="${contentToken.content}" data-level="${grade}">`
    }

    markdown.renderer.rules['heading_close'] = (tokens: Array<Token>, index: number): string => {
        const token = tokens[index]
        return `</div></a></${token.tag}>`
    }

}
