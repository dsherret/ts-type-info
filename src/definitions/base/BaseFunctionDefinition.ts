import {TypeExpression} from "./../../expressions";
import {applyMixins, ArrayExt} from "./../../utils";
import {MainFactory} from "./../../factories";
import {INode, ISignature} from "./../../wrappers";
import {TypeParameterDefinition} from "./../general";
import {INamedDefinition, NamedDefinition} from "./NamedDefinition";
import {IParentedDefinition} from "./ParentedDefinition";
import {ITypeParameteredDefinition, TypeParameteredDefinition} from "./TypeParameteredDefinition";
import {BaseDefinition} from "./BaseDefinition";
import {DefinitionType} from "./DefinitionType";
import {BaseParameterDefinitionConstructor} from "./BaseParameterDefinition";
import {IParameteredDefinition, ParameteredDefinition} from "./ParameteredDefinition";
import {IReturnTypedDefinition, ReturnTypedDefinition} from "./ReturnTypedDefinition";

export class BaseFunctionDefinition<ParentType, ParameterType>
        extends BaseDefinition
        implements INamedDefinition, IParentedDefinition<ParentType>, ITypeParameteredDefinition,
                   IParameteredDefinition<ParameterType>, IReturnTypedDefinition {
    constructor(
        mainFactory: MainFactory,
        node: INode,
        parameterDefinition: BaseParameterDefinitionConstructor<BaseFunctionDefinition<ParentType, ParameterType>, ParameterType>,
        definitionType: DefinitionType
    ) {
        super(definitionType);
        this.fillName(node);
        this.fillParametersBySymbol(mainFactory, node, parameterDefinition);
        this.fillReturnTypeExpressionBySymbol(mainFactory, node);
        this.fillTypeParametersBySymbol(mainFactory, node);
    }

    // NamedDefinition
    name: string;
    fillName: (node: INode) => void;
    // IParentedDefinition
    parent: ParentType;
    // ParameteredDefinition
    parameters: ArrayExt<ParameterType>;
    fillParametersBySymbol: (
        mainFactory: MainFactory,
        node: INode,
        paramDefinition: BaseParameterDefinitionConstructor<this, ParameterType>
    ) => void;
    fillParametersBySignature: (
        mainFactory: MainFactory,
        signature: ISignature,
        paramDefinition: BaseParameterDefinitionConstructor<this, ParameterType>
    ) => void;
    // ReturnTyped
    returnTypeExpression: TypeExpression;
    fillReturnTypeExpressionBySymbol: (mainFactory: MainFactory, node: INode) => void;
    fillReturnTypeExpressionBySignature: (mainFactory: MainFactory, signature: ISignature) => void;
    // TypeParameteredDefinition
    typeParameters: ArrayExt<TypeParameterDefinition<this>>;
    fillTypeParametersBySymbol: (mainFactory: MainFactory, node: INode) => void;
    fillTypeParametersBySignature: (mainFactory: MainFactory, signature: ISignature) => void;
}

applyMixins(BaseFunctionDefinition, [NamedDefinition, TypeParameteredDefinition, ParameteredDefinition, ReturnTypedDefinition]);
