import MarkdownIt from "markdown-it";
import {DEFAULT_MARKDOWN_IT_OPTIONS} from "@/utils/MarkdownUtils";
import DecoratorProvider from "@/markup/decorator/DecoratorProvider";
import RuleType from "@/markup/constant/RuleType";
import sh from "shiki";
import shiki from "@shikijs/markdown-it";

export default defineNuxtPlugin(async (nuxtApp) => {

    const markdownIt = new MarkdownIt(DEFAULT_MARKDOWN_IT_OPTIONS);

    DecoratorProvider.provide(RuleType.BLOCK_QUOTE).decorate(markdownIt);
    DecoratorProvider.provide(RuleType.HEADLINE).decorate(markdownIt);
    DecoratorProvider.provide(RuleType.CODE_BLOCK).decorate(markdownIt);
    const highlighter = await sh.getSingletonHighlighter();

    markdownIt.use(await shiki({
        transformers: [
            {
                code(hast) {
                    hast.properties.className = [
                        ...(hast.properties.className as string [] || []),
                        'text-nowrap'
                    ];
                    return hast;
                },
            }
        ],
        themes: {
            light: 'catppuccin-frappe',
            dark: 'catppuccin-mocha'
        },
    }));

    nuxtApp.provide('md', markdownIt);
});
