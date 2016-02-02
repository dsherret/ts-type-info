import * as ts from "typescript";
import {TypeExpression} from "./../../../expressions";
import {applyMixins, TypeChecker} from "./../../../utils";
import {INamedDefinition, NamedDefinition, IParentedDefinition, ITypeParameteredDefinition, TypeParameteredDefinition} from "./../../base";
import {TypeParameterDefinition} from "./../../general";
import {BaseParameterDefinitionConstructor} from "./base-parameter-definition";
import {IParameteredDefinition, ParameteredDefinition} from "./parametered-definition";
import {IReturnTypedDefinition, ReturnTypedDefinition} from "./return-typed-definition";

export class BaseFunctionDefinition<ParentType, ParameterType>
    implements INamedDefinition, IParentedDefinition<ParentType>, ITypeParameteredDefinition, IParameteredDefinition<ParameterType>, IReturnTypedDefinition {

    constructor(
        typeChecker: TypeChecker,
        symbol: ts.Symbol,
        parameterDefinition: BaseParameterDefinitionConstructor<BaseFunctionDefinition<ParentType, ParameterType>, ParameterType>
    ) {
        this.fillName(typeChecker, symbol);
        this.fillParametersBySymbol(typeChecker, symbol, parameterDefinition);
        this.fillReturnTypeExpressionBySymbol(typeChecker, symbol);
        this.fillTypeParametersBySymbol(typeChecker, symbol);
    }

    // NamedDefinition
    name: string;
    fillName: (typeChecker: TypeChecker, symbol: ts.Symbol) => void;
    // IParentedDefinition
    parent: ParentType;
    // ParameteredDefinition
    parameters: ParameterType[];
    fillParametersBySymbol: (typeChecker: TypeChecker, symbol: ts.Symbol, paramDefinition: BaseParameterDefinitionConstructor<this, ParameterType>) => void;
    fillParametersBySignature: (typeChecker: TypeChecker, signature: ts.Signature, paramDefinition: BaseParameterDefinitionConstructor<this, ParameterType>) => void;
    // ReturnTyped
    returnTypeExpression: TypeExpression;
    fillReturnTypeExpressionBySymbol: (typeChecker: TypeChecker, symbol: ts.Symbol) => void;
    fillReturnTypeExpressionBySignature: (typeChecker: TypeChecker, signature: ts.Signature) => void;
    // TypeParameteredDefinition
    typeParameters: TypeParameterDefinition<this>[];
    fillTypeParametersBySymbol: (typeChecker: TypeChecker, symbol: ts.Symbol) => void;
    fillTypeParametersBySignature: (typeChecker: TypeChecker, signature: ts.Signature) => void;
}

applyMixins(BaseFunctionDefinition, [NamedDefinition, TypeParameteredDefinition, ParameteredDefinition, ReturnTypedDefinition]);
