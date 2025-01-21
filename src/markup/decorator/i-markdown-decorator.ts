import MarkdownIt from "markdown-it";

export default interface IMarkdownDecorator {

    decorate(markdownIt: MarkdownIt, isDebug?: boolean): void;
}
