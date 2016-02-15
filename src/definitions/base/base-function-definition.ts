import {TypeExpression} from "./../../expressions";
import {applyMixins, ArrayExt} from "./../../utils";
import {WrappedSymbolNode, WrappedSignature} from "./../../wrappers";
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
                                                               implements INamedDefinition, IParentedDefinition<ParentType>, ITypeParameteredDefinition,
                                                                          IParameteredDefinition<ParameterType>, IReturnTypedDefinition {
    constructor(
        symbolNode: WrappedSymbolNode,
        parameterDefinition: BaseParameterDefinitionConstructor<BaseFunctionDefinition<ParentType, ParameterType>, ParameterType>,
        definitionType: DefinitionType
    ) {
        super(definitionType);
        this.fillName(symbolNode);
        this.fillParametersBySymbol(symbolNode, parameterDefinition);
        this.fillReturnTypeExpressionBySymbol(symbolNode);
        this.fillTypeParametersBySymbol(symbolNode);
    }

    // NamedDefinition
    name: string;
    fillName: (symbolNode: WrappedSymbolNode) => void;
    // IParentedDefinition
    parent: ParentType;
    // ParameteredDefinition
    parameters: ArrayExt<ParameterType>;
    fillParametersBySymbol: (symbolNode: WrappedSymbolNode, paramDefinition: BaseParameterDefinitionConstructor<this, ParameterType>) => void;
    fillParametersBySignature: (signature: WrappedSignature, paramDefinition: BaseParameterDefinitionConstructor<this, ParameterType>) => void;
    // ReturnTyped
    returnTypeExpression: TypeExpression;
    fillReturnTypeExpressionBySymbol: (symbolNode: WrappedSymbolNode) => void;
    fillReturnTypeExpressionBySignature: (signature: WrappedSignature) => void;
    // TypeParameteredDefinition
    typeParameters: ArrayExt<TypeParameterDefinition<this>>;
    fillTypeParametersBySymbol: (symbolNode: WrappedSymbolNode) => void;
    fillTypeParametersBySignature: (signature: WrappedSignature) => void;
}

applyMixins(BaseFunctionDefinition, [NamedDefinition, TypeParameteredDefinition, ParameteredDefinition, ReturnTypedDefinition]);
