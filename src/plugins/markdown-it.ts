import MarkdownIt from "markdown-it";
import {DEFAULT_MARKDOWN_IT_OPTIONS} from "@/utils/markdown-utils";
import DecoratorProvider from "@/markup/decorator/decorator-provider";
import RuleType from "@/markup/constant/rule-type";
import shiki from "@shikijs/markdown-it";
import codeGroupParser from "@/plugins/markdown-it/code-group-parser";
import imageGroupParser from "@/plugins/markdown-it/image-group-parser";
import textWrappingParser from "@/plugins/markdown-it/text-wrapping-parser";
import {fromHighlighter} from "@shikijs/markdown-it/core";
import {createHighlighterCore} from "shiki";


export default defineNuxtPlugin(async (nuxtApp) => {
    if (nuxtApp.$md) return;
    const markdownIt = new MarkdownIt(DEFAULT_MARKDOWN_IT_OPTIONS);

    markdownIt.use(codeGroupParser);
    markdownIt.use(imageGroupParser);
    markdownIt.use(textWrappingParser);
    markdownIt.use(crateShikiExtension);

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

const crateShikiExtension = await shiki({
    transformers: [
        {
            pre(hast: any) {
                hast.properties['class'] = 'code-content shiki text-nowrap';
                return hast;
            }
        }
    ],
    themes: {
        light: 'min-light',
        dark: 'dracula-soft'
    },
    defaultColor: false,
    cssVariablePrefix: '--shiki-'
});