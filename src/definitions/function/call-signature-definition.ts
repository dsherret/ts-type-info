import {WrappedSymbolNode, WrappedSignature} from "./../../wrappers";
import {ReturnTypedStructure, CallSignatureParameterStructure, TypeParameteredStructure} from "./../../structures";
import {TypeExpression} from "./../../expressions";
import {applyMixins, ArrayExt} from "./../../utils";
import {ITypeParameteredDefinition, TypeParameteredDefinition, BaseDefinition, DefinitionType,
        IReturnTypedDefinition, ReturnTypedDefinition, IParameteredDefinition, ParameteredDefinition} from "./../base";
import {TypeParameterDefinition} from "./../general";
import {CallSignatureParameterDefinition} from "./call-signature-parameter-definition";

export class CallSignatureDefinition
        extends BaseDefinition
        implements ITypeParameteredDefinition, IParameteredDefinition<CallSignatureParameterDefinition, CallSignatureParameterStructure>, IReturnTypedDefinition {
    minArgumentCount: number;

    constructor(signature: WrappedSignature) {
        super(DefinitionType.CallSignature);
        this.fillReturnTypeExpressionBySignature(signature);
        this.fillParametersBySignature(signature, CallSignatureParameterDefinition);
        this.fillTypeParametersBySignature(signature);

        this.minArgumentCount = signature.getMinArgumentCount();
    }

    // ParameteredDefinition
    parameters: ArrayExt<CallSignatureParameterDefinition>;
    fillParametersBySymbol: (
        symbolNode: WrappedSymbolNode,
        parameterDefinition: typeof CallSignatureParameterDefinition) => void;
    fillParametersBySignature: (
        signature: WrappedSignature,
        parameterDefinition: typeof CallSignatureParameterDefinition) => void;
    // ReturnTyped
    returnTypeExpression: TypeExpression;
    fillReturnTypeExpressionBySymbol: (symbolNodeOrStructure: WrappedSymbolNode | ReturnTypedStructure) => void;
    fillReturnTypeExpressionBySignature: (signatureOrStructure: WrappedSignature | ReturnTypedStructure) => void;
    // TypeParameteredDefinition
    typeParameters: ArrayExt<TypeParameterDefinition<this>>;
    fillTypeParametersBySymbol: (symbolNodeOrStructure: WrappedSymbolNode | TypeParameteredStructure) => void;
    fillTypeParametersBySignature: (signatureOrStructure: WrappedSignature | TypeParameteredStructure) => void;
}

applyMixins(CallSignatureDefinition, [TypeParameteredDefinition, ParameteredDefinition, ReturnTypedDefinition]);
