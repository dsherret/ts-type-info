import * as ts from "typescript";
import {TypeChecker} from "./../../utils";
import {BasePropertyDefinition} from "./base-property-definition";
import {Expression} from "./../../expressions";

export class ObjectPropertyDefinition extends BasePropertyDefinition {
    defaultExpression: Expression;

    constructor(typeChecker: TypeChecker, symbol: ts.Symbol) {
        super(typeChecker, symbol);

        this.fillDefaultExpression(typeChecker, symbol);
    }

    private fillDefaultExpression(typeChecker: TypeChecker, symbol: ts.Symbol) {
        let declaration = typeChecker.getDeclarationFromSymbol(symbol) as ts.PropertyDeclaration;

        this.defaultExpression = declaration.initializer != null ? new Expression(typeChecker, declaration.initializer) : null;
    }
}
