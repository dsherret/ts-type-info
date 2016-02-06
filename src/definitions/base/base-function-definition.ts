import * as ts from "typescript";
import {TypeExpression} from "./../../expressions";
import {applyMixins, TypeChecker} from "./../../utils";
import {TypeParameterDefinition} from "./../general";
import {INamedDefinition, NamedDefinition} from "./named-definition";
import {IParentedDefinition} from "./parented-definition";
import {ITypeParameteredDefinition, TypeParameteredDefinition} from "./type-parametered-definition";
import {BaseDefinition} from "./base-definition";
import {DefinitionType} from "./definition-type";
import {BaseParameterDefinitionConstructor} from "./base-parameter-definition";
import {IParameteredDefinition, ParameteredDefinition} from "./parametered-definition";
import {IReturnTypedDefinition, ReturnTypedDefinition} from "./return-typed-definition";

export class BaseFunctionDefinition<ParentType, ParameterType> extends BaseDefinition
    implements INamedDefinition, IParentedDefinition<ParentType>, ITypeParameteredDefinition, IParameteredDefinition<ParameterType>, IReturnTypedDefinition {

    constructor(
        typeChecker: TypeChecker,
        symbol: ts.Symbol,
        parameterDefinition: BaseParameterDefinitionConstructor<BaseFunctionDefinition<ParentType, ParameterType>, ParameterType>,
        definitionType: DefinitionType
    ) {
        super(definitionType);
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
