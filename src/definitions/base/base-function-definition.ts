import {TypeExpression} from "./../../expressions";
import {applyMixins, ArrayExt, MainCache} from "./../../utils";
import {ISymbolNode, ISignature} from "./../../wrappers";
import {TypeParameterDefinition} from "./../general";
import {INamedDefinition, NamedDefinition} from "./named-definition";
import {IParentedDefinition} from "./parented-definition";
import {ITypeParameteredDefinition, TypeParameteredDefinition} from "./type-parametered-definition";
import {BaseDefinition} from "./base-definition";
import {DefinitionType} from "./definition-type";
import {BaseParameterDefinitionConstructor} from "./base-parameter-definition";
import {IParameteredDefinition, ParameteredDefinition} from "./parametered-definition";
import {IReturnTypedDefinition, ReturnTypedDefinition} from "./return-typed-definition";

export class BaseFunctionDefinition<ParentType, ParameterType>
        extends BaseDefinition
        implements INamedDefinition, IParentedDefinition<ParentType>, ITypeParameteredDefinition,
                   IParameteredDefinition<ParameterType>, IReturnTypedDefinition {
    constructor(
        mainCache: MainCache,
        symbolNode: ISymbolNode,
        parameterDefinition: BaseParameterDefinitionConstructor<BaseFunctionDefinition<ParentType, ParameterType>, ParameterType>,
        definitionType: DefinitionType
    ) {
        super(definitionType);
        this.fillName(symbolNode);
        this.fillParametersBySymbol(mainCache, symbolNode, parameterDefinition);
        this.fillReturnTypeExpressionBySymbol(mainCache, symbolNode);
        this.fillTypeParametersBySymbol(mainCache, symbolNode);
    }

    // NamedDefinition
    name: string;
    fillName: (symbolNode: ISymbolNode) => void;
    // IParentedDefinition
    parent: ParentType;
    // ParameteredDefinition
    parameters: ArrayExt<ParameterType>;
    fillParametersBySymbol: (
        mainCache: MainCache,
        symbolNode: ISymbolNode,
        paramDefinition: BaseParameterDefinitionConstructor<this, ParameterType>
    ) => void;
    fillParametersBySignature: (
        mainCache: MainCache,
        signature: ISignature,
        paramDefinition: BaseParameterDefinitionConstructor<this, ParameterType>
    ) => void;
    // ReturnTyped
    returnTypeExpression: TypeExpression;
    fillReturnTypeExpressionBySymbol: (mainCache: MainCache, symbolNode: ISymbolNode) => void;
    fillReturnTypeExpressionBySignature: (mainCache: MainCache, signature: ISignature) => void;
    // TypeParameteredDefinition
    typeParameters: ArrayExt<TypeParameterDefinition<this>>;
    fillTypeParametersBySymbol: (mainCache: MainCache, symbolNode: ISymbolNode) => void;
    fillTypeParametersBySignature: (mainCache: MainCache, signature: ISignature) => void;
}

applyMixins(BaseFunctionDefinition, [NamedDefinition, TypeParameteredDefinition, ParameteredDefinition, ReturnTypedDefinition]);
