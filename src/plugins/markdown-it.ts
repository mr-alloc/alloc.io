import MarkdownIt from "markdown-it";
import {DEFAULT_MARKDOWN_IT_OPTIONS} from "@/utils/markdown-utils";
import DecoratorProvider from "@/markup/decorator/decorator-provider";
import RuleType from "@/markup/constant/rule-type";
import shiki from "@shikijs/markdown-it";

export default defineNuxtPlugin(async (nuxtApp) => {
<<<<<<< HEAD
<<<<<<< HEAD:src/plugins/markdown-it.ts
=======
    console.log('md: ', nuxtApp.$md);
=======

    //다른곳에서 nuxtApp.$md 호출시 나오지 않는경우, 플러그인이 로드되지 않아서일 수 있다.
    //이경우 plugins 디렉터리 하위에 바로 위치 하는지 확인이 필요하다.
>>>>>>> 6f46ebc (debug: change markdown-it plugin position. (unloaded))

>>>>>>> ca726a4 (debug: markdown-it module undefined):src/plugins/markdown-it/markdown-it.ts
    if (nuxtApp.$md) return;
    const markdownIt = new MarkdownIt(DEFAULT_MARKDOWN_IT_OPTIONS);

    DecoratorProvider.provides(
        RuleType.BLOCK_QUOTE,
        RuleType.HEADLINE,
        RuleType.CODE_BLOCK,
        RuleType.IMAGE,
        RuleType.LINK,
        RuleType.TABLE,
        RuleType.IMAGE_GROUP
    ).forEach(decorator => decorator.decorate(markdownIt));

    const shikiExtension = await shiki({
        transformers: [
            {
                code(hast: any) {
                    const original: string = hast.properties['class'] as string;
                    const classes = original?.split(' ');
                    classes.push('text-nowrap');
                    hast.properties['class'] = classes.join(' ');
                    return hast;
                }
            }
        ],
        themes: {
            light: 'material-theme-lighter',
            dark: 'material-theme-palenight'
        },
    });
    markdownIt.use(shikiExtension);

    nuxtApp.provide('md', markdownIt);
});
