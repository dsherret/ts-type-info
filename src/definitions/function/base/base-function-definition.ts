import * as ts from "typescript";
import {TypeExpression} from "./../../../expressions";
import {applyMixins, TypeChecker} from "./../../../utils";
import {INamedDefinition, NamedDefinition} from "./../../base";
import {BaseParameterDefinition, BaseParameterDefinitionConstructor} from "./base-parameter-definition";
import {IParameteredDefinition, ParameteredDefinition} from "./parametered-definition";
import {IReturnTypedDefinition, ReturnTypedDefinition} from "./return-typed-definition";
import {TypeParameterDefinition} from "./../../misc";

export class BaseFunctionDefinition<T extends BaseParameterDefinition> implements INamedDefinition, IParameteredDefinition<T>, IReturnTypedDefinition {
    private _typeParameters: TypeParameterDefinition[] = [];

    constructor(parameterDefinition: BaseParameterDefinitionConstructor<T>, typeChecker: TypeChecker, symbol: ts.Symbol) {
        this.fillName(symbol);
        this.fillParametersBySymbol(parameterDefinition, typeChecker, symbol);
        this.fillReturnTypeExpressionBySymbol(typeChecker, symbol);
        this.fillTypeParameters(typeChecker, symbol);
    }

    get typeParameters() {
        return this._typeParameters;
    }

    private fillTypeParameters(typeChecker: TypeChecker, symbol: ts.Symbol) {
        this._typeParameters = typeChecker.getFunctionTypeParameterSymbols(symbol).map(s => new TypeParameterDefinition(typeChecker, s));
    }

    // NameDefinition
    fillName: (symbol: ts.Symbol) => void;
    name: string;
    // ParameteredDefinition
    fillParametersBySymbol: (parameterDefinition: BaseParameterDefinitionConstructor<T>, typeChecker: TypeChecker, symbol: ts.Symbol) => void;
    fillParametersBySignature: (parameterDefinition: BaseParameterDefinitionConstructor<T>, typeChecker: TypeChecker, signature: ts.Signature) => void;
    parameters: T[];
    // ReturnTyped
    fillReturnTypeExpressionBySymbol: (typeChecker: TypeChecker, symbol: ts.Symbol) => void;
    fillReturnTypeExpressionBySignature: (typeChecker: TypeChecker, signature: ts.Signature) => void;
    returnTypeExpression: TypeExpression;
}

applyMixins(BaseFunctionDefinition, [NamedDefinition, ParameteredDefinition, ReturnTypedDefinition]);
