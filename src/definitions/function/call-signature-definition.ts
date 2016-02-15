import {CallSignatureParameterDefinition} from "./call-signature-parameter-definition";
import {ITypeParameteredDefinition, TypeParameteredDefinition, BaseDefinition, DefinitionType,
        IReturnTypedDefinition, ReturnTypedDefinition, IParameteredDefinition, ParameteredDefinition} from "./../base";
import {TypeParameterDefinition} from "./../general";
import {applyMixins, ExtendedArray} from "./../../utils";
import {WrappedSymbolNode, WrappedSignature} from "./../../wrappers";
import {TypeExpression} from "./../../expressions";

export class CallSignatureDefinition extends BaseDefinition
                                     implements ITypeParameteredDefinition, IParameteredDefinition<CallSignatureParameterDefinition>, IReturnTypedDefinition {
    minArgumentCount: number;

    constructor(signature: WrappedSignature) {
        super(DefinitionType.CallSignature);
        this.fillReturnTypeExpressionBySignature(signature);
        this.fillParametersBySignature(signature, CallSignatureParameterDefinition);
        this.fillTypeParametersBySignature(signature);

        this.minArgumentCount = signature.getMinArgumentCount();
    }

    // ParameteredDefinition
    parameters: ExtendedArray<CallSignatureParameterDefinition>;
    fillParametersBySymbol: (
        symbolNode: WrappedSymbolNode,
        parameterDefinition: typeof CallSignatureParameterDefinition) => void;
    fillParametersBySignature: (
        signature: WrappedSignature,
        parameterDefinition: typeof CallSignatureParameterDefinition) => void;
    // ReturnTyped
    returnTypeExpression: TypeExpression;
    fillReturnTypeExpressionBySymbol: (symbolNode: WrappedSymbolNode) => void;
    fillReturnTypeExpressionBySignature: (signature: WrappedSignature) => void;
    // TypeParameteredDefinition
    typeParameters: ExtendedArray<TypeParameterDefinition<this>>;
    fillTypeParametersBySymbol: (symbolNode: WrappedSymbolNode) => void;
    fillTypeParametersBySignature: (signature: WrappedSignature) => void;
}

applyMixins(CallSignatureDefinition, [TypeParameteredDefinition, ParameteredDefinition, ReturnTypedDefinition]);
