import {IParentedDefinition, BaseDefinition, DefinitionType, IParameteredDefinition, ParameteredDefinition, ReturnTypedDefinition, IReturnTypedDefinition} from "./../base";
import {TypeExpression} from "./../../expressions";
import {applyMixins, ArrayExt} from "./../../utils";
import {IDefinitionFactory} from "./../../factories";
import {ISymbolNode, ISignature} from "./../../wrappers";
import {InterfaceNewSignatureParameterDefinition} from "./interface-new-signature-parameter-definition";
import {InterfaceDefinition} from "./interface-definition";

export class InterfaceNewSignatureDefinition
        extends BaseDefinition
        implements IParameteredDefinition<InterfaceNewSignatureParameterDefinition>, IReturnTypedDefinition,
                   IParentedDefinition<InterfaceDefinition> {

    constructor(definitionFactory: IDefinitionFactory, signature: ISignature, parent: InterfaceDefinition) {
        super(DefinitionType.InterfaceNewSignature);
        this.fillParametersBySignature(definitionFactory, signature, InterfaceNewSignatureParameterDefinition);
        this.fillReturnTypeExpressionBySignature(definitionFactory, signature);
        this.parent = parent;
    }

    // ParentedDefinition
    parent: InterfaceDefinition;
    // ParameteredDefinition
    parameters: ArrayExt<InterfaceNewSignatureParameterDefinition>;
    fillParametersBySymbol: (
        definitionFactory: IDefinitionFactory,
        symbolNode: ISymbolNode,
        parameterDefinition: typeof InterfaceNewSignatureParameterDefinition) => void;
    fillParametersBySignature: (
        definitionFactory: IDefinitionFactory,
        signature: ISignature,
        parameterDefinition: typeof InterfaceNewSignatureParameterDefinition) => void;
    // ReturnTyped
    returnTypeExpression: TypeExpression;
    fillReturnTypeExpressionBySymbol: (definitionFactory: IDefinitionFactory, symbolNode: ISymbolNode) => void;
    fillReturnTypeExpressionBySignature: (definitionFactory: IDefinitionFactory, signature: ISignature) => void;
}

applyMixins(InterfaceNewSignatureDefinition, [ParameteredDefinition, ReturnTypedDefinition]);
