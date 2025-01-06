import MarkdownIt from "markdown-it";
import Token from "markdown-it/lib/token";
import Renderer from "markdown-it/lib/renderer";

export default interface IMarkdownDecorator {

    decorate(markdownIt: MarkdownIt, isDebug?: boolean): void;
}
