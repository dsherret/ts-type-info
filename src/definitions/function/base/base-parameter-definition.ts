import * as ts from "typescript";
import {applyMixins, TypeChecker} from "./../../../utils";
import {Expression, TypeExpression} from "./../../../expressions";
import {INamedDefinition, NamedDefinition, IParentedDefinition, ITypeExpressionedDefinition, TypeExpressionedDefinition, IDefaultExpressionedDefinition,
        DefaultExpressionedDefinition} from "./../../base";

export interface BaseParameterDefinitionConstructor<ParentType, ParameterType> {
    new(typeChecker: TypeChecker, symbol: ts.Symbol, parent: ParentType): ParameterType;
}

export class BaseParameterDefinition<ParentType> implements INamedDefinition, IParentedDefinition<ParentType>, ITypeExpressionedDefinition, IDefaultExpressionedDefinition {
    isOptional: boolean;
    isRestParameter: boolean;

    constructor(typeChecker: TypeChecker, symbol: ts.Symbol, parent: ParentType) {
        this.fillName(typeChecker, symbol);
        this.fillTypeExpression(typeChecker, symbol);
        this.fillParameterDetails(typeChecker, symbol);
        this.fillDefaultExpression(typeChecker, symbol);
        this.parent = parent;
    }

    private fillParameterDetails(typeChecker: TypeChecker, symbol: ts.Symbol) {
        let declaration = typeChecker.getDeclarationFromSymbol(symbol) as ts.ParameterDeclaration;

        this.isOptional = declaration.questionToken != null || declaration.initializer != null || declaration.dotDotDotToken != null;
        this.isRestParameter = declaration.dotDotDotToken != null;
    }

    // NamedDefinition
    name: string;
    fillName: (typeChecker: TypeChecker, symbol: ts.Symbol) => void;
    // IParentedDefinition
    parent: ParentType;
    // TypeExpressionedDefinition
    typeExpression: TypeExpression;
    fillTypeExpression: (typeChecker: TypeChecker, symbol: ts.Symbol) => void;
    // DefaultExpressionedDefinition
    defaultExpression: Expression;
    fillDefaultExpression: (typeChecker: TypeChecker, symbol: ts.Symbol) => void;
}

applyMixins(BaseParameterDefinition, [NamedDefinition, TypeExpressionedDefinition, DefaultExpressionedDefinition]);
