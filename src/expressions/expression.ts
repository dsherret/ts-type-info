import * as ts from "typescript";
import {TypeChecker} from "./../utils";

export class Expression {
    private _text: string;

    constructor(typeChecker: TypeChecker, expression: ts.Expression) {
        this._text = typeChecker.getExpressionFullText(expression);
    }

    get text() {
        return this._text;
    }
}
