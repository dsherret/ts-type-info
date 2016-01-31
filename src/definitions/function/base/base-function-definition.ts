import * as ts from "typescript";
import {TypeExpression} from "./../../../expressions";
import {applyMixins, TypeChecker} from "./../../../utils";
import {INamedDefinition, NamedDefinition, IParentedDefinition, ITypeParameteredDefinition, TypeParameteredDefinition} from "./../../base";
import {TypeParameterDefinition} from "./../../general";
import {BaseParameterDefinitionConstructor} from "./base-parameter-definition";
import {IParameteredDefinition, ParameteredDefinition} from "./parametered-definition";
import {IReturnTypedDefinition, ReturnTypedDefinition} from "./return-typed-definition";

export class BaseFunctionDefinition<ThisType extends BaseFunctionDefinition<ThisType, ParentType, ParameterType>, ParentType, ParameterType>
    implements INamedDefinition, IParentedDefinition<ParentType>, ITypeParameteredDefinition<ThisType>, IParameteredDefinition<ThisType, ParameterType>, IReturnTypedDefinition {

    constructor(parameterDefinition: BaseParameterDefinitionConstructor<ParameterType>, typeChecker: TypeChecker, symbol: ts.Symbol) {
        this.fillName(typeChecker, symbol);
        this.fillParametersBySymbol(parameterDefinition, typeChecker, symbol);
        this.fillReturnTypeExpressionBySymbol(typeChecker, symbol);
        this.fillTypeParametersBySymbol(typeChecker, symbol);
    }

    // NamedDefinition
    name: string;
    parent: ParentType;
    fillName: (typeChecker: TypeChecker, symbol: ts.Symbol) => void;
    // ParameteredDefinition
    parameters: ParameterType[];
    fillParametersBySymbol: (parameterDefinition: BaseParameterDefinitionConstructor<ParameterType>, typeChecker: TypeChecker, symbol: ts.Symbol) => void;
    fillParametersBySignature: (parameterDefinition: BaseParameterDefinitionConstructor<ParameterType>, typeChecker: TypeChecker, signature: ts.Signature) => void;
    // ReturnTyped
    returnTypeExpression: TypeExpression;
    fillReturnTypeExpressionBySymbol: (typeChecker: TypeChecker, symbol: ts.Symbol) => void;
    fillReturnTypeExpressionBySignature: (typeChecker: TypeChecker, signature: ts.Signature) => void;
    // TypeParameteredDefinition
    typeParameters: TypeParameterDefinition<ThisType>[];
    fillTypeParametersBySymbol: (typeChecker: TypeChecker, symbol: ts.Symbol) => void;
    fillTypeParametersBySignature: (typeChecker: TypeChecker, signature: ts.Signature) => void;
}

applyMixins(BaseFunctionDefinition, [NamedDefinition, TypeParameteredDefinition, ParameteredDefinition, ReturnTypedDefinition]);
