import {TypeExpression} from "./../../expressions";
import {applyMixins, ArrayExt} from "./../../utils";
import {MainFactory} from "./../../factories";
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
        mainFactory: MainFactory,
        symbolNode: ISymbolNode,
        parameterDefinition: BaseParameterDefinitionConstructor<BaseFunctionDefinition<ParentType, ParameterType>, ParameterType>,
        definitionType: DefinitionType
    ) {
        super(definitionType);
        this.fillName(symbolNode);
        this.fillParametersBySymbol(mainFactory, symbolNode, parameterDefinition);
        this.fillReturnTypeExpressionBySymbol(mainFactory, symbolNode);
        this.fillTypeParametersBySymbol(mainFactory, symbolNode);
    }

    // NamedDefinition
    name: string;
    fillName: (symbolNode: ISymbolNode) => void;
    // IParentedDefinition
    parent: ParentType;
    // ParameteredDefinition
    parameters: ArrayExt<ParameterType>;
    fillParametersBySymbol: (
        mainFactory: MainFactory,
        symbolNode: ISymbolNode,
        paramDefinition: BaseParameterDefinitionConstructor<this, ParameterType>
    ) => void;
    fillParametersBySignature: (
        mainFactory: MainFactory,
        signature: ISignature,
        paramDefinition: BaseParameterDefinitionConstructor<this, ParameterType>
    ) => void;
    // ReturnTyped
    returnTypeExpression: TypeExpression;
    fillReturnTypeExpressionBySymbol: (mainFactory: MainFactory, symbolNode: ISymbolNode) => void;
    fillReturnTypeExpressionBySignature: (mainFactory: MainFactory, signature: ISignature) => void;
    // TypeParameteredDefinition
    typeParameters: ArrayExt<TypeParameterDefinition<this>>;
    fillTypeParametersBySymbol: (mainFactory: MainFactory, symbolNode: ISymbolNode) => void;
    fillTypeParametersBySignature: (mainFactory: MainFactory, signature: ISignature) => void;
}

applyMixins(BaseFunctionDefinition, [NamedDefinition, TypeParameteredDefinition, ParameteredDefinition, ReturnTypedDefinition]);
