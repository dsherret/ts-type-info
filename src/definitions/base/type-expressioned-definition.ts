import * as ts from "typescript";
import {TypeExpression} from "./../../expressions";
import {TypeChecker, tryGet} from "./../../utils";

export interface ITypeExpressionedDefinition {
    typeExpression: TypeExpression;
    fillTypeExpression(typeChecker: TypeChecker, symbol: ts.Symbol): void;
}

export abstract class TypeExpressionedDefinition implements ITypeExpressionedDefinition {
    typeExpression: TypeExpression;

    fillTypeExpression(typeChecker: TypeChecker, symbol: ts.Symbol) {
        tryGet(symbol, () => typeChecker.getTypeExpressionOfSymbol(symbol), (expression) => {
            this.typeExpression = expression;
        });
    }
}
