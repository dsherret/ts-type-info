import * as ts from "typescript";
import {TsBaseOptions, TsBase} from "./TsBase";

export interface TsExpressionOptions extends TsBaseOptions {
    expression: ts.Expression;
}

export class TsExpression extends TsBase {
    private readonly expression: ts.Expression;

    constructor(opts: TsExpressionOptions) {
        super(opts);
        this.expression = opts.expression;
    }

    getText() {
        return this.expression.getText(this.sourceFile) || "";
    }
}
