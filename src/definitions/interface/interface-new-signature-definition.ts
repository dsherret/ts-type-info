import {IParentedDefinition, BaseDefinition, DefinitionType, IParameteredDefinition, ParameteredDefinition, ReturnTypedDefinition, IReturnTypedDefinition} from "./../base";
import {TypeExpression} from "./../../expressions";
import {applyMixins, ExtendedArray} from "./../../utils";
import {WrappedSymbolNode, WrappedSignature} from "./../../wrappers";
import {InterfaceNewSignatureParameterDefinition} from "./interface-new-signature-parameter-definition";
import {InterfaceDefinition} from "./interface-definition";

export class InterfaceNewSignatureDefinition extends BaseDefinition
                                             implements IParameteredDefinition<InterfaceNewSignatureParameterDefinition>, IReturnTypedDefinition,
                                                        IParentedDefinition<InterfaceDefinition> {

    constructor(signature: WrappedSignature, parent: InterfaceDefinition) {
        super(DefinitionType.InterfaceNewSignature);
        this.fillParametersBySignature(signature, InterfaceNewSignatureParameterDefinition);
        this.fillReturnTypeExpressionBySignature(signature);
        this.parent = parent;
    }

    // ParentedDefinition
    parent: InterfaceDefinition;
    // ParameteredDefinition
    parameters: ExtendedArray<InterfaceNewSignatureParameterDefinition>;
    fillParametersBySymbol: (
        symbolNode: WrappedSymbolNode,
        parameterDefinition: typeof InterfaceNewSignatureParameterDefinition) => void;
    fillParametersBySignature: (
        signature: WrappedSignature,
        parameterDefinition: typeof InterfaceNewSignatureParameterDefinition) => void;
    // ReturnTyped
    returnTypeExpression: TypeExpression;
    fillReturnTypeExpressionBySymbol: (symbolNode: WrappedSymbolNode) => void;
    fillReturnTypeExpressionBySignature: (signature: WrappedSignature) => void;
}

applyMixins(InterfaceNewSignatureDefinition, [ParameteredDefinition, ReturnTypedDefinition]);
