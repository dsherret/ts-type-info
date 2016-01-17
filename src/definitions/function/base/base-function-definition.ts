import * as ts from "typescript";
import {TypeExpression} from "./../../../expressions";
import {applyMixins, TypeChecker} from "./../../../utils";
import {INamedDefinition, NamedDefinition, ITypeParameteredDefinition, TypeParameteredDefinition} from "./../../base";
import {TypeParameterDefinition} from "./../../general";
import {BaseParameterDefinition, BaseParameterDefinitionConstructor} from "./base-parameter-definition";
import {IParameteredDefinition, ParameteredDefinition} from "./parametered-definition";
import {IReturnTypedDefinition, ReturnTypedDefinition} from "./return-typed-definition";

export class BaseFunctionDefinition<T extends BaseParameterDefinition> implements INamedDefinition, ITypeParameteredDefinition, IParameteredDefinition<T>, IReturnTypedDefinition {
    constructor(parameterDefinition: BaseParameterDefinitionConstructor<T>, typeChecker: TypeChecker, symbol: ts.Symbol) {
        this.fillName(symbol);
        this.fillParametersBySymbol(parameterDefinition, typeChecker, symbol);
        this.fillReturnTypeExpressionBySymbol(typeChecker, symbol);
        this.fillTypeParametersBySymbol(typeChecker, symbol);
    }

    // NamedDefinition
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
    // TypeParameteredDefinition
    fillTypeParametersBySymbol: (typeChecker: TypeChecker, symbol: ts.Symbol) => void;
    fillTypeParametersBySignature: (typeChecker: TypeChecker, signature: ts.Signature) => void;
    typeParameters: TypeParameterDefinition[];
}

applyMixins(BaseFunctionDefinition, [NamedDefinition, TypeParameteredDefinition, ParameteredDefinition, ReturnTypedDefinition]);
