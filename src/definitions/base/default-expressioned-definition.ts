import * as ts from "typescript";
import {Expression} from "./../../expressions";
import {TypeChecker} from "./../../utils";

export interface IDefaultExpressionedDefinition {
    defaultExpression: Expression;
    fillDefaultExpression(typeChecker: TypeChecker, symbol: ts.Symbol): void;
}

export abstract class DefaultExpressionedDefinition implements IDefaultExpressionedDefinition {
    defaultExpression: Expression;

    fillDefaultExpression(typeChecker: TypeChecker, symbol: ts.Symbol) {
        let declaration = typeChecker.getDeclarationFromSymbol(symbol) as ts.PropertyDeclaration;

        this.defaultExpression = declaration.initializer != null ? new Expression(typeChecker, declaration.initializer) : null;
    }
}
