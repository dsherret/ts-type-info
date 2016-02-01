import * as ts from "typescript";
import {applyMixins, TypeChecker} from "./../../utils";
import {TypeExpression} from "./../../expressions";
import {INamedDefinition, NamedDefinition} from "./named-definition";
import {IParentedDefinition} from "./parented-definition";
import {ITypeExpressionedDefinition, TypeExpressionedDefinition} from "./type-expressioned-definition";

export class BasePropertyDefinition<ParentType> implements INamedDefinition, IParentedDefinition<ParentType>, ITypeExpressionedDefinition {
    isOptional: boolean;

    constructor(typeChecker: TypeChecker, symbol: ts.Symbol, parent: ParentType) {
        this.fillName(typeChecker, symbol);
        this.fillTypeExpression(typeChecker, symbol);
        this.fillIsOptional(typeChecker, symbol);
        this.parent = parent;
    }

    private fillIsOptional(typeChecker: TypeChecker, symbol: ts.Symbol) {
        const declaration = typeChecker.getDeclarationFromSymbol(symbol);

        this.isOptional = declaration != null && (declaration as ts.PropertyDeclaration).questionToken != null;
    }

    // NamedDefinition
    name: string;
    fillName: (typeChecker: TypeChecker, symbol: ts.Symbol) => void;
    // IParentedDefinition
    parent: ParentType;
    // TypeExpressionedDefinition
    typeExpression: TypeExpression;
    fillTypeExpression: (typeChecker: TypeChecker, symbol: ts.Symbol) => void;
}

applyMixins(BasePropertyDefinition, [NamedDefinition, TypeExpressionedDefinition]);
