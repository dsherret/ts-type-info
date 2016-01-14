import * as ts from "typescript";
import {applyMixins, TypeChecker} from "./../../../utils";
import {Expression, TypeExpression} from "./../../../expressions";
import {INamedDefinition, NamedDefinition, ITypeExpressionedDefinition, TypeExpressionedDefinition} from "./../../base";

export interface BaseParameterDefinitionConstructor<T extends BaseParameterDefinition> {
    new(typeChecker: TypeChecker, symbol: ts.Symbol): T;
}

export class BaseParameterDefinition implements INamedDefinition, ITypeExpressionedDefinition {
    isOptional: boolean;
    isRestParameter: boolean;
    defaultExpression: Expression;

    constructor(typeChecker: TypeChecker, symbol: ts.Symbol) {
        this.fillName(symbol);
        this.fillTypeExpression(typeChecker, symbol);
        this.fillParameterDetails(typeChecker, symbol);
    }

    private fillParameterDetails(typeChecker: TypeChecker, symbol: ts.Symbol) {
        let declaration = symbol.valueDeclaration as ts.ParameterDeclaration;

        this.isOptional = declaration.questionToken != null || declaration.initializer != null || declaration.dotDotDotToken != null;
        this.isRestParameter = declaration.dotDotDotToken != null;
        this.defaultExpression = declaration.initializer != null ? new Expression(typeChecker, declaration.initializer) : null;
    }

    // NamedDefinition
    fillName: (symbol: ts.Symbol) => void;
    name: string;
    // TypeExpressionedDefinition
    fillTypeExpression: (typeChecker: TypeChecker, symbol: ts.Symbol) => void;
    typeExpression: TypeExpression;
}

applyMixins(BaseParameterDefinition, [NamedDefinition, TypeExpressionedDefinition]);
