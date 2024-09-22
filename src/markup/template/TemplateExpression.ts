export default class TemplateExpression {

    public static readonly TEXT_INDEX = 1;
    public static readonly ATTRS_INDEX = 2;
    private static readonly EXPRESSION = /^([\s\S]*?)\s*:\s*(\{[\s\S]*\})\s*$/mg;
    private static INSTANCE: TemplateExpression;
    private constructor() {}

    public static getInstance(): TemplateExpression {
        if (TemplateExpression.INSTANCE === null) {
            TemplateExpression.INSTANCE = new TemplateExpression();
        }

        return TemplateExpression.INSTANCE;
    }

    public static test(src: string): boolean {
        const result = TemplateExpression.EXPRESSION.test(src);
        TemplateExpression.EXPRESSION.lastIndex = 0;
        return result;
    }

    public static exec(src: string): RegExpExecArray {
        if ( ! TemplateExpression.test(src)) {
            throw new Error(`Cannot parse template for string: "${src}"`);
        }

        const executed = TemplateExpression.EXPRESSION.exec(src);
        TemplateExpression.EXPRESSION.lastIndex = 0;
        return executed!;
    }

}
