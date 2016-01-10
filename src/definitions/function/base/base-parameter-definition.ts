import * as ts from "typescript";
import {applyMixins, TypeChecker} from "./../../../utils";
import {Expression, TypeExpression} from "./../../../expressions";
import {INamedDefinition, NamedDefinition, ITypedDefinition, TypedDefinition} from "./../../base";

export interface BaseParameterDefinitionConstructor<T extends BaseParameterDefinition> {
    new(typeChecker: TypeChecker, symbol: ts.Symbol): T;
}

export class BaseParameterDefinition implements ITypedDefinition, INamedDefinition {
    private _isOptional: boolean;
    private _isRestParameter: boolean;
    private _defaultExpression: Expression;

    constructor(typeChecker: TypeChecker, symbol: ts.Symbol) {
        this.fillName(symbol);
        this.fillTypeExpression(typeChecker, symbol);
        this.fillParameterDetails(typeChecker, symbol);
    }

    get isOptional() {
        return this._isOptional;
    }

    get isRestParameter() {
        return this._isRestParameter;
    }

    get defaultExpression() {
        return this._defaultExpression;
    }

    private fillParameterDetails(typeChecker: TypeChecker, symbol: ts.Symbol) {
        let declaration = symbol.valueDeclaration as ts.ParameterDeclaration;

        this._isOptional = declaration.questionToken != null || declaration.initializer != null || declaration.dotDotDotToken != null;
        this._isRestParameter = declaration.dotDotDotToken != null;
        this._defaultExpression = declaration.initializer != null ? new Expression(typeChecker, declaration.initializer) : null;
    }

    // NameDefinition
    fillName: (symbol: ts.Symbol) => void;
    name: string;
    // TypedDefinition
    fillTypeExpression: (typeChecker: TypeChecker, symbol: ts.Symbol) => void;
    typeExpression: TypeExpression;
}

applyMixins(BaseParameterDefinition, [NamedDefinition, TypedDefinition]);
