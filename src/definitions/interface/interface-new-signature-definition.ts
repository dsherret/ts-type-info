import {IParentedDefinition, BaseDefinition, DefinitionType, IParameteredDefinition, ParameteredDefinition, ReturnTypedDefinition, IReturnTypedDefinition} from "./../base";
import {TypeExpression} from "./../../expressions";
import {applyMixins, ArrayExt} from "./../../utils";
import {WrappedSymbolNode, WrappedSignature} from "./../../wrappers";
import {InterfaceNewSignatureStructure, ReturnTypedStructure, ParameteredStructure, InterfaceNewSignatureParameterStructure} from "./../../structures";
import {InterfaceNewSignatureParameterDefinition} from "./interface-new-signature-parameter-definition";
import {InterfaceDefinition} from "./interface-definition";

export class InterfaceNewSignatureDefinition extends BaseDefinition
        implements IParameteredDefinition<InterfaceNewSignatureParameterDefinition, InterfaceNewSignatureParameterStructure>, IReturnTypedDefinition,
                   IParentedDefinition<InterfaceDefinition> {

    constructor(signatureOrStructure: WrappedSignature | InterfaceNewSignatureStructure, parent: InterfaceDefinition) {
        super(DefinitionType.InterfaceNewSignature);
        this.fillParametersBySignature(signatureOrStructure, InterfaceNewSignatureParameterDefinition);
        this.fillReturnTypeExpressionBySignature(signatureOrStructure);
        this.parent = parent;
    }

    // ParentedDefinition
    parent: InterfaceDefinition;
    // ParameteredDefinition
    parameters: ArrayExt<InterfaceNewSignatureParameterDefinition>;
    fillParametersBySymbol: (
        symbolNodeOrStructure: WrappedSymbolNode | ParameteredStructure<InterfaceNewSignatureParameterStructure>,
        parameterDefinition: typeof InterfaceNewSignatureParameterDefinition) => void;
    fillParametersBySignature: (
        signatureOrStructure: WrappedSignature | ParameteredStructure<InterfaceNewSignatureParameterStructure>,
        parameterDefinition: typeof InterfaceNewSignatureParameterDefinition) => void;
    // ReturnTyped
    returnTypeExpression: TypeExpression;
    fillReturnTypeExpressionBySymbol: (symbolNodeOrStructure: WrappedSymbolNode | ReturnTypedStructure) => void;
    fillReturnTypeExpressionBySignature: (signatureOrStructure: WrappedSignature | ReturnTypedStructure) => void;
}

applyMixins(InterfaceNewSignatureDefinition, [ParameteredDefinition, ReturnTypedDefinition]);
