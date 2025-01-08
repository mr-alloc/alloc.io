import type IMarkdownDecorator from "@/markup/decorator/i-markdown-decorator";
import MarkdownIt from "markdown-it";
import Token from "markdown-it/lib/token";
import {slugify} from "@/utils/string-utils";
import type {PostMetadata} from "@/classes/implement/PostMetadata";
import {usePostContentStore} from "@/store/post-content-store";

export default class HeadlineDecorator implements IMarkdownDecorator {

    private readonly KEY_OPEN = 'heading_open';
    private readonly KEY_CLOSE = 'heading_close';
    private readonly FRAGMENT_EXTRACTOR_RE = /([^:]+)(?:::([\s\S]+))?/mg;

    public decorate(markdownIt: MarkdownIt, isDebug: boolean = false): void {
        const route = useRoute();

        markdownIt.renderer.rules[this.KEY_OPEN] = (tokens: Array<Token>, index: number): string => {
            const headlineTag = tokens[index].tag;
            const inline = tokens[index +1];
            const inlineContent = inline.content;

            const [tempTitle, tempFragment] = this.extractFragment(inlineContent, inline);
            const toc = usePostContentStore().headlineMap.get(route.path)?.get(inlineContent);
            const title = toc?.title ?? tempTitle;
            const fragment = toc?.fragment ?? tempFragment;

            inline.content = title;
            if (inline.children) {
                inline.children[0].content = title;
            }

            return (
                `<${headlineTag} id="${fragment}" class="scroll-mt-[calc(48px+48px+var(--header-height))] lg:scroll-mt-[calc(48px+var(--header-height))]">
                    <a aria-current="page" href="${route.path}#${fragment}" class="router-link-active router-link-exact-active group">
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

    private extractFragment(content: string, inline: Token): [string, string] {
        const executed = this.FRAGMENT_EXTRACTOR_RE.exec(content);
        this.FRAGMENT_EXTRACTOR_RE.lastIndex = 0;

        const title = executed?.[1] ?? '';
        const fragment = executed?.[2] ?? '';
        return [title, fragment];
    }
}
