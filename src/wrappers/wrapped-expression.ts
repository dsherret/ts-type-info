import * as ts from "typescript";
import {BaseWrappedTypeOptions, BaseWrappedType} from "./base-wrapped-type";

export interface WrappedExpressionOptions extends BaseWrappedTypeOptions {
    expression: ts.Expression;
}

export class WrappedExpression extends BaseWrappedType {
    private expression: ts.Expression;

    constructor(opts: WrappedExpressionOptions) {
        super(opts);
        this.expression = opts.expression;
    }

    getText() {
        return this.typeChecker.getExpressionFullText(this.expression);
    }
}
