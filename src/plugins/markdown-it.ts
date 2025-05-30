import MarkdownIt from "markdown-it";
import {DEFAULT_MARKDOWN_IT_OPTIONS} from "@/utils/markdown-utils";
import DecoratorProvider from "@/markup/decorator/decorator-provider";
import RuleType from "@/markup/constant/rule-type";
import shiki from "@shikijs/markdown-it";
import codeGroupParser from "@/plugins/markdown-it/code-group-parser";
import imageGroupParser from "@/plugins/markdown-it/image-group-parser";
import textWrappingParser from "@/plugins/markdown-it/text-wrapping-parser";
import subParser from "@/plugins/markdown-it/sub-parser";
import supParser from "@/plugins/markdown-it/sup-parser";
import blockQuoteParser from "@/plugins/markdown-it/block-quote-parser";

export default defineNuxtPlugin(async (nuxtApp) => {
    if (nuxtApp.$md) return;
    const markdownIt = new MarkdownIt(DEFAULT_MARKDOWN_IT_OPTIONS);

    markdownIt.use(blockQuoteParser)
    markdownIt.use(codeGroupParser);
    markdownIt.use(imageGroupParser);
    markdownIt.use(textWrappingParser);
    markdownIt.use(subParser);
    markdownIt.use(supParser);
    //Top-level await is not available
    markdownIt.use(await crateShikiExtension);

    DecoratorProvider.provides(
        RuleType.BLOCK_QUOTE,
        RuleType.HEADLINE,
        RuleType.CODE_BLOCK,
        RuleType.IMAGE,
        RuleType.LINK,
        RuleType.TABLE,
        RuleType.IMAGE_GROUP,
        RuleType.CODE_GROUP,
        RuleType.TEXT_WRAPPING
    ).forEach(decorator => decorator.decorate(markdownIt));

    nuxtApp.provide('md', markdownIt);
});

const crateShikiExtension = shiki({
    transformers: [
        {
            pre(hast: any) {
                hast.properties['class'] = 'code-content shiki text-nowrap';
                return hast;
            }
        }
    ],
    themes: {
        light: 'one-light',
        dark: 'dracula-soft'
    },
    defaultColor: false,

    cssVariablePrefix: '--shiki-'
});

const pseudocodeLang = {
    name: "pseudocode",
    scopeName: "source.pseudocode",
    fileTypes: ["pseudocode", "pseudo"],
    patterns: [
        {
            name: "keyword.control.pseudocode",
            match: "\\b(method|is|if|then|else|while|for|return|throw)\\b",
        },
        {
            name: "comment.line.pseudocode",
            match: "//.*$",
        },
        {
            name: "string.quoted.pseudocode",
            match: '"[^"]*"',
        },
        {
            name: "support.type.exception.pseudocode",
            match: "\\b(StackOverflowException|Exception)\\b",
        },
    ],
    uuid: "pseudocode-language-definition",
};
