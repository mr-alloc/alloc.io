import MarkdownIt from "markdown-it";
import type IMarkdownDecorator from "@/markup/decorator/IMarkdownDecorator";
import Token from "markdown-it/lib/token";
import Renderer from "markdown-it/lib/renderer";
import {usePostContentStore} from "@/store/post-content-store";
import _ from "lodash";


export default class LinkDecorator implements IMarkdownDecorator {

    private readonly KEY_OPEN = 'link_open';

    decorate(markdownIt: MarkdownIt): void {
        const route = useRoute();
        const proxy = (tokens: Array<Token>, index: number, options: MarkdownIt.Options, env: any, self: Renderer) => self.renderToken(tokens, index, options);
        const fallbackRule = markdownIt.renderer.rules[this.KEY_OPEN] || proxy;

        markdownIt.renderer.rules[this.KEY_OPEN] = (
            tokens: Array<Token>,
            index: number,
            options: MarkdownIt.Options,
            env: any,
            self: Renderer
        ): string => {

            const token = tokens[index];
            const path = token.attrGet('href') ?? '';

            const notUpdated = path.length === 0 || this.isNotExistWiki(path);

            if (notUpdated) {
                token.attrJoin('class', 'text-red-500 dark:text-red-700');
                token.attrJoin('href', '#');
            }

            return fallbackRule(tokens, index, options, env, self);
        }

    }


    private isNotExistWiki(path: string): boolean {
        return path.startsWith('/wiki') && !usePostContentStore().isWiki(_.last(path.split('/'))?.split('#')[0] ?? '');
    }
}