import * as ts from "typescript";
import {applyMixins, TypeChecker} from "./../../utils";
import {TypeExpression} from "./../../expressions";
import {INamedDefinition, NamedDefinition} from "./named-definition";
import {ITypeExpressionedDefinition, TypeExpressionedDefinition} from "./type-expressioned-definition";

export class BasePropertyDefinition implements ITypeExpressionedDefinition, INamedDefinition {
    isOptional: boolean;

    constructor(typeChecker: TypeChecker, symbol: ts.Symbol) {
        this.fillName(symbol);
        this.fillTypeExpression(typeChecker, symbol);
        this.fillIsOptional(typeChecker, symbol);
    }

    private fillIsOptional(typeChecker: TypeChecker, symbol: ts.Symbol) {
        const declaration = typeChecker.getDeclarationFromSymbol(symbol);

        this.isOptional = declaration != null && (declaration as ts.PropertyDeclaration).questionToken != null;
    }

    // NamedDefinition
    name: string;
    fillName: (symbol: ts.Symbol) => void;
    // TypeExpressionedDefinition
    typeExpression: TypeExpression;
    fillTypeExpression: (typeChecker: TypeChecker, symbol: ts.Symbol) => void;
}

applyMixins(BasePropertyDefinition, [NamedDefinition, TypeExpressionedDefinition]);
