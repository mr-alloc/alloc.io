import MarkdownIt from "markdown-it";
import Token from "markdown-it/lib/token";
import {Headline} from "~/class/implement/Headline";
import {TocItem} from "~/class/implement/TocItem";
import StateInline from "markdown-it/lib/rules_inline/state_inline";
import StateBlock from "markdown-it/lib/rules_block/state_block";
import {TocNode} from "~/class/implement/TocNode";

type Options = {
    includeLevel?: number []
    containerClass?: string
    slugify: (str: string) => string
    markerPattern?: RegExp
    listType?: string
    format: (content: string, md: MarkdownIt) => string
    forceFullToc?: boolean
    containerHeaderHtml?: string | undefined
    containerFooterHtml?: string | undefined
    transformLink?: (anchor: string) => string | undefined
}

// [\r\n\t\f\v ] to dash
const slugify = (str: string) => encodeURIComponent(String(str).trim().toLowerCase().replace(/\s+/g, '-'))
export const defaults = {
    includeLevel: [1, 2, 3, 4, 5],
    containerClass: 'table-of-contents',
    slugify: slugify,
    markerPattern: /^#{1,6} (.+)$/gm, //### Some title
    listType: 'ul',
    format: (content: string, md: MarkdownIt) => md.renderInline(content),
    forceFullToc: false,
    containerHeaderHtml: undefined,
    containerFooterHtml: undefined,
    transformLink: undefined
} as Options
const tocRegexp: RegExp = defaults.markerPattern!

/**
 * 토큰에 존재하는 id 속성을 찾는다.
 * @param token 토큰
 * @returns {string} anchor 태그 id
 */
function findExistingIdAttr(token: Token): string {
    if (token && token.attrs && token.attrs.length > 0) {
        const idAttr = token.attrs.find((attr) => Array.isArray(attr) && attr.length >= 2 && attr[0] === 'id')
        if (idAttr && Array.isArray(idAttr) && idAttr.length >= 2) {
            const [_, val] = idAttr
            return val
        }

    }

    return ''
}

/**
 * 마크다운 문서에서 선언된 레벨에 대한 모든 헤드라인 아이템을 찾는다.
 * @param {Array<number>} levels 헤드라인 레벨 [1, 2, 3]
 * @param {Array<Token>} tokens 플러그인에있는 토큰
 * @param {Options} options 플러그인 옵션
 * @return {Array<Headline>}
 */
function findHeadlineElements(levels: number [], tokens: Token [], options: Options): Headline [] {
    const headings: Headline [] = []
    let currentHeading: Headline | null = null


    tokens.forEach(token => {
        if (token.type === 'heading_open') {
            const id = findExistingIdAttr(token)
            const level = parseInt(token.tag.toLowerCase().replace('h', ''), 10)
            if (levels.indexOf(level) >= 0) {
                currentHeading = new Headline(level, '', id)
            }
        }
        else if (currentHeading && token.type === 'inline') {
            const textContent = token.children
                ?.filter((childToken) => childToken.type === 'text' || childToken.type === 'code_inline')
                ?.reduce((acc, t) => acc + t.content, '')

            currentHeading.text = textContent!
            if ( ! currentHeading.anchor) {
                currentHeading.anchor = options.slugify(textContent!)
            }
        }
        else if (token.type === 'heading_close') {
            if (currentHeading) {
                headings.push(currentHeading)
            }
        }
    })

    return headings
}

/**
 * TOC가 올바르게 중첩되도록 헤드라인의 최소레벨을 찾는다.
 * @param {Array<Headline>} headlineItems
 * @returns {number} 최소 레벨
 */
function getMinLevel(headlineItems: Headline []): number {
    return Math.min(...headlineItems.map((headline) => headline.level))
}

function addListItem(level: number, text: string, anchor: string, rootNode: TocItem): TocItem {
    const headline = new Headline(level, text, anchor)
    const toc = new TocItem(headline, [], rootNode)
    rootNode.children.push(toc)

    return toc
}

function flatHeadlineItemsToNestedTree(headlineItems: Array<Headline>): TocItem {
    const headline = new Headline(getMinLevel(headlineItems), '', '')
    //전체 TOC를 보유하는 텍스트 없이 루트 노드를 생성. 렌더링되지 않고 해당 자식만 렌더링
    const toc = new TocItem(headline, [], null)
    //현재 목록의 마지막 루트 항목을 추적하는 포인터
    let currentRootNode: TocItem = toc
    //마지막 항목을 추적하는 포인터
    let previous: TocItem = currentRootNode

    headlineItems.forEach((headline) => {
        //레벨이 크다면
        if (headline.level > previous.headline.level) {
            Array.from({ length: headline.level - previous.headline.level }).forEach(_ => {
                currentRootNode = previous
                previous = addListItem(headline.level, '', '', currentRootNode)
            })
            previous.headline.text = headline.text
            previous.headline.anchor = headline.anchor
        }

        else if (headline.level === previous.headline.level) {
            previous = addListItem(headline.level, headline.text, headline.anchor, currentRootNode)
        }

        else if (headline.level < previous.headline.level) {
            for (let i = 0; i < previous.headline.level - headline.level + 1; i++) {
                currentRootNode = currentRootNode.parent!
            }
            previous = addListItem(headline.level, headline.text, headline.anchor, currentRootNode)
        }
    })
    return toc
}

function tocItemToHtml(toc: TocItem, options: Options, md: MarkdownIt): string {
    return '<' + options.listType + '>' + toc.children.map(child => {
        let li = '<li>'
        let anchor = child.headline.anchor
        if (options && options.transformLink) {
            anchor = options.transformLink(anchor)!
        }

        let text = child.headline.text ? options.format(child.headline.text, md) : ''
        li += anchor ? `<a href="#${anchor}">${text}</a>` : (text || '')

        return li + (child.children.length > 0 ? tocItemToHtml(child, options, md) : '') + '</li>'
    }).join('') + '</' + options.listType + '>'
}

//
// markdown.renderer.rules['toc_open'] = (tokens: Array<Token>, index: number) => {
//     let tocOpenHtml = '<div class="' + plugInOptions.containerClass + '">'
//
//     plugInOptions.containerHeaderHtml && (tocOpenHtml += plugInOptions.containerHeaderHtml)
//
//     return tocOpenHtml
// }
//
// markdown.renderer.rules['toc_close'] = (tokens: Array<Token>, index: number) => {
//     let tocFooterHtml = ''
//
//     plugInOptions.containerFooterHtml && (tocFooterHtml += plugInOptions.containerFooterHtml)
//
//     return tocFooterHtml + '</div>'
// }
//
// markdown.renderer.rules['toc_body'] = (tokens: Array<Token>, index: number) => {
//     if (plugInOptions.forceFullToc) {
//         throw ("forceFullToc was removed in version 0.5.0. For more information, see https://github.com/Oktavilla/markdown-it-table-of-contents/pull/41")
//     } else {
//         let headline = findHeadlineElements(plugInOptions.includeLevel!, gstate?.tokens, options);
//         const toc = flatHeadlineItemsToNestedTree(headline)
//         return tocItemToHtml(toc, plugInOptions, markdown)
//     }
// }


// markdown.core.ruler.push('grab_state', (state: StateCore) => {
//     gstate = state
// })

function toc(state: StateInline, silent: boolean) {

    console.log('be state block:', state)
    return false
    if (state.src.charCodeAt(state.pos) != 0x5B/* [ */) {
        return false
    }
    console.log('state:', state)
    return false
    if (silent) return false

    const match = tocRegexp.exec(state.src.substring(state.pos))
        ?.filter((m: string) => m) ?? []
    console.log('match:', match)
    if (match.length < 1) return false

    let token = state.push('toc_open', 'toc', 1)
    console.log('token:', token)
    token.markup = '[[toc]]'
    token = state.push('toc_body', '', 0)
    token = state.push('toc_close', 'toc', -1)

    const newline = state.src.indexOf('\n', state.pos)

    state.pos = newline !== -1
        ? newline
        : state.pos + state.posMax +1

    return true
}

const blockToc = (state: StateBlock, startLine: number, endLine: number, silent: boolean): boolean => {
    console.log('be state block:', state)
    return true
}

export const tableOfContents = (markdown: MarkdownIt)  => {

    markdown.renderer.rules['heading_open'] = (tokens: Array<Token>, index: number): string => {
        const token = tokens[index]
        const contentToken = tokens[index + 1]

        let tag = token.tag
        let grade = parseInt(tag.replace('h', ''), 10)
        let tocNode = new TocNode(grade, contentToken.content);
        return `<div class="sub-title"><${tag} id="${tocNode.fragmentId}">`
    }

    markdown.renderer.rules['heading_close'] = (tokens: Array<Token>, index: number): string => {
        const token = tokens[index]
        return `</${token.tag}></div>`
    }
}
