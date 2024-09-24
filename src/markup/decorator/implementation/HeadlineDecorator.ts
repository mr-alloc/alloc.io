import type IMarkdownDecorator from "@/markup/decorator/IMarkdownDecorator";
import MarkdownIt from "markdown-it";
import Token from "markdown-it/lib/token";
import {slugify} from "@/utils/StringUtils";

export default class HeadlineDecorator implements IMarkdownDecorator {

    private readonly KEY_OPEN = 'heading_open';
    private readonly KEY_CLOSE = 'heading_close';

    decorate(markdownIt: MarkdownIt): void {
        const route = useRoute();

        markdownIt.renderer.rules[this.KEY_OPEN] = (tokens: Array<Token>, index: number): string => {
            const headlineTag = tokens[index].tag;
            const inline = tokens[index +1];
            const inlineContent = inline.content;

            const slug = slugify(inlineContent, false);

            return (
                `<${headlineTag} id="${slug}" class="scroll-mt-[calc(48px+48px+var(--header-height))] lg:scroll-mt-[calc(48px+var(--header-height))]">
                    <a aria-current="page" href="${route.fullPath}#${slug}" class="router-link-active router-link-exact-active group">
                        <div class="-ml-6 pr-2 py-2 inline-flex opacity-0 group-hover:lg:opacity-100 transition-opacity absolute">
                            <span class="iconify i-ph:hash w-4 h-4 text-primary"></span>
                        </div>`
            );
        }

        markdownIt.renderer.rules[this.KEY_CLOSE] = (tokens: Array<Token>, index: number): string => {
            const headlineTag = tokens[index].tag;
            return `</a></${headlineTag}>`;
        }
    }

}
