import * as ts from "typescript";
import {applyMixins, TypeChecker} from "./../../../utils";
import {Expression, TypeExpression} from "./../../../expressions";
import {INamedDefinition, NamedDefinition, ITypeExpressionedDefinition, TypeExpressionedDefinition, IDefaultExpressionedDefinition, DefaultExpressionedDefinition} from "./../../base";
import {BaseFunctionDefinition} from "./base-function-definition";

export interface BaseParameterDefinitionConstructor<ParameterType> {
    new(typeChecker: TypeChecker, symbol: ts.Symbol): ParameterType;
}

export class BaseParameterDefinition<ParentType> implements INamedDefinition<ParentType>, ITypeExpressionedDefinition, IDefaultExpressionedDefinition {
    isOptional: boolean;
    isRestParameter: boolean;

    constructor(typeChecker: TypeChecker, symbol: ts.Symbol) {
        this.fillName(typeChecker, symbol);
        this.fillTypeExpression(typeChecker, symbol);
        this.fillParameterDetails(typeChecker, symbol);
        this.fillDefaultExpression(typeChecker, symbol);
    }

    private fillParameterDetails(typeChecker: TypeChecker, symbol: ts.Symbol) {
        let declaration = typeChecker.getDeclarationFromSymbol(symbol) as ts.ParameterDeclaration;

        this.isOptional = declaration.questionToken != null || declaration.initializer != null || declaration.dotDotDotToken != null;
        this.isRestParameter = declaration.dotDotDotToken != null;
    }

    // NamedDefinition
    name: string;
    parent: ParentType;
    fillName: (typeChecker: TypeChecker, symbol: ts.Symbol) => void;
    // TypeExpressionedDefinition
    typeExpression: TypeExpression;
    fillTypeExpression: (typeChecker: TypeChecker, symbol: ts.Symbol) => void;
    // DefaultExpressionedDefinition
    defaultExpression: Expression;
    fillDefaultExpression: (typeChecker: TypeChecker, symbol: ts.Symbol) => void;
}

applyMixins(BaseParameterDefinition, [NamedDefinition, TypeExpressionedDefinition, DefaultExpressionedDefinition]);
