import type IMarkdownDecorator from "@/markup/decorator/IMarkdownDecorator";
import RuleType from "@/markup/constant/RuleType";
import BlockquoteDecorator from "@/markup/decorator/implementation/BlockquoteDecorator";
import HeadlineDecorator from "@/markup/decorator/implementation/HeadlineDecorator";
import CodeBlockDecorator from "@/markup/decorator/implementation/CodeBlockDecorator";
import ParagraphDecorator from "@/markup/decorator/implementation/ParagraphDecorator";

export default class DecoratorProvider {

    private static _instance: DecoratorProvider;

    private readonly _decorators: Map<RuleType, IMarkdownDecorator>;
    private constructor() {
        const entries: [RuleType, IMarkdownDecorator][] = [
            [RuleType.BLOCK_QUOTE, new BlockquoteDecorator()],
            [RuleType.HEADLINE, new HeadlineDecorator()],
            [RuleType.CODE_BLOCK, new CodeBlockDecorator()],
            [RuleType.PARAGRAPH, new ParagraphDecorator()]
        ]

        this._decorators = new Map<RuleType, IMarkdownDecorator>(entries);
    }

    private static getInstance(): DecoratorProvider {
        if (!this._instance) {
            this._instance = new DecoratorProvider();
        }
        return this._instance;
    }

    public static provide(rule: RuleType): IMarkdownDecorator {
        if ( ! this.getInstance()._decorators.has(rule)) {
            throw Promise.reject(`Not found decorator which coupled with key: ${rule.name}`)
        }

        return this.getInstance()._decorators.get(rule)!;
    }
}
