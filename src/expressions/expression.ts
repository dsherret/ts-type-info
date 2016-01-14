import * as ts from "typescript";
import {TypeChecker} from "./../utils";

export class Expression {
    text: string;

    constructor(typeChecker: TypeChecker, expression: ts.Expression) {
        this.text = typeChecker.getExpressionFullText(expression);
    }
}
