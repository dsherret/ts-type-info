import * as ts from "typescript";
import {TypeExpression} from "./../../expressions";
import {TypeChecker} from "./../../utils";

export interface ITypeExpressionedDefinition {
    fillTypeExpression(typeChecker: TypeChecker, symbol: ts.Symbol): void;
    typeExpression: TypeExpression;
}

export abstract class TypeExpressionedDefinition implements ITypeExpressionedDefinition {
    private _typeExpression: TypeExpression;

    fillTypeExpression(typeChecker: TypeChecker, symbol: ts.Symbol) {
        this._typeExpression = typeChecker.getTypeExpressionOfSymbol(symbol);
    }

    get typeExpression() {
        return this._typeExpression;
    }
}
