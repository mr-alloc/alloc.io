import MarkdownIt from "markdown-it";
import {DEFAULT_MARKDOWN_IT_OPTIONS} from "@/utils/MarkdownUtils";
import DecoratorProvider from "@/markup/decorator/decorator-provider";
import RuleType from "@/markup/constant/RuleType";
import shiki from "@shikijs/markdown-it";

export default defineNuxtPlugin(async (nuxtApp) => {

    const markdownIt = new MarkdownIt(DEFAULT_MARKDOWN_IT_OPTIONS);

    DecoratorProvider.provide(RuleType.BLOCK_QUOTE).decorate(markdownIt);
    DecoratorProvider.provide(RuleType.HEADLINE).decorate(markdownIt);
    DecoratorProvider.provide(RuleType.CODE_BLOCK).decorate(markdownIt);
    DecoratorProvider.provide(RuleType.PARAGRAPH).decorate(markdownIt);
    DecoratorProvider.provide(RuleType.LINK).decorate(markdownIt);
    DecoratorProvider.provide(RuleType.TABLE).decorate(markdownIt);

    markdownIt.use(await shiki({
        transformers: [
            {
                code(hast) {
                    const original: string = hast.properties['class'] as string;
                    const classes = original?.split(' ');
                    classes.push('text-nowrap');
                    hast.properties['class'] = classes.join(' ');
                    return hast;
                }
            }
        ],
        themes: {
            light: 'min-light',
            dark: 'catppuccin-mocha'
        },
    }));

    nuxtApp.provide('md', markdownIt);
});
