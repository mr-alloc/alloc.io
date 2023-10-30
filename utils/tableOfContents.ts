import MarkdownIt from "markdown-it";

type Options = {
    includeLevel?: number []
    containerClass?: string
    slugify?: (str: string) => string
    markerPattern?: RegExp
    listType?: string
    format?: (content: string, md: MarkdownIt, anchor: string | null) => string
    forceFullToc?: boolean
    containerHeaderHtml?: string | undefined
    containerFooterHtml?: string | undefined
    transformLink?: (anchor: string) => string | undefined
}

// [\r\n\t\f\v ] to dash
const slugify = (str: string) => encodeURIComponent(String(str).trim().toLowerCase().replace(/\s+/g, '-'))

const defaults = {
    includeLevel: [1, 2],
    containerClass: 'table-of-contents',
    slugify: slugify,
    markerPattern: /^\[\[toc\]\]/im, //[[toc]]
    listType: 'ul',
    format: (content: string, md: MarkdownIt) => md.renderInline(content),
    forceFullToc: false,
    containerHeaderHtml: undefined,
    containerFooterHtml: undefined,
    transformLink: undefined
} as Options


function findHeadlineElements(levels: number [], tokens: string [], options: Options) {
    const headings = []
}


export default (markdown: MarkdownIt, options: Options) => {
    //Table of Contents for Markdown
    const options = Object.assign({}, Options, o)

}
