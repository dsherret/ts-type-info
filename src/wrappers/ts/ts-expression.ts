import * as ts from "typescript";
import {TsBaseOptions, TsBase} from "./ts-base";
import {IExpression} from "./../expression";

export interface TsExpressionOptions extends TsBaseOptions {
    expression: ts.Expression;
}

export class TsExpression extends TsBase implements IExpression {
    private expression: ts.Expression;

    constructor(opts: TsExpressionOptions) {
        super(opts);
        this.expression = opts.expression;
    }

    getText() {
        return (this.expression.getFullText(this.sourceFile) || "").trim();
    }
}
