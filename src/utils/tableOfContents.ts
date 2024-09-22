import MarkdownIt from "markdown-it";
import Token from "markdown-it/lib/token";
import {PostMetadata} from "@/classes/implement/PostMetadata";
import {slugify} from "@/utils/StringUtils";

const specialCharacterRE = /[.*+?^${}()|[\]\\]/g
export const tableOfContents = (markdown: MarkdownIt, metadata: PostMetadata)  => {

    markdown.renderer.rules['heading_open'] = (tokens: Array<Token>, index: number): string => {
        const token = tokens[index]
        const contentToken = tokens[index + 1]

        let tag = token.tag
        let grade = parseInt(tag.replace('h', ''), 10)
        const slug = slugify(contentToken.content, false)
            .replace(specialCharacterRE, '\\$&')
        return `<${tag} id="${slug}">
                    <a href="${metadata.path}#${slug}" aria-current="page">
                        <div class="">
                            <span class="i-ph-hash-duotone"></span>
                        </div>
                        <div class="headline-wrapper" data-title="${contentToken.content}" data-level="${grade}">`
    }

    markdown.renderer.rules['heading_close'] = (tokens: Array<Token>, index: number): string => {
        const token = tokens[index]
        return `</div></a></${token.tag}>`
    }

}
