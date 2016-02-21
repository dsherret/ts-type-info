import {ISymbolNode, ISignature} from "./../../wrappers";
import {TypeExpression} from "./../../expressions";
import {applyMixins, ArrayExt, MainCache} from "./../../utils";
import {ITypeParameteredDefinition, TypeParameteredDefinition, BaseDefinition, DefinitionType,
        IReturnTypedDefinition, ReturnTypedDefinition, IParameteredDefinition, ParameteredDefinition} from "./../base";
import {TypeParameterDefinition} from "./../general";
import {CallSignatureParameterDefinition} from "./call-signature-parameter-definition";

export class CallSignatureDefinition
        extends BaseDefinition
        implements ITypeParameteredDefinition, IParameteredDefinition<CallSignatureParameterDefinition>, IReturnTypedDefinition {
    minArgumentCount: number;

    constructor(mainCache: MainCache, signature: ISignature) {
        super(DefinitionType.CallSignature);
        this.fillReturnTypeExpressionBySignature(mainCache, signature);
        this.fillParametersBySignature(mainCache, signature, CallSignatureParameterDefinition);
        this.fillTypeParametersBySignature(mainCache, signature);

        this.minArgumentCount = signature.getMinArgumentCount();
    }

    // ParameteredDefinition
    parameters: ArrayExt<CallSignatureParameterDefinition>;
    fillParametersBySymbol: (
        mainCache: MainCache,
        symbolNode: ISymbolNode,
        parameterDefinition: typeof CallSignatureParameterDefinition) => void;
    fillParametersBySignature: (
        mainCache: MainCache,
        signature: ISignature,
        parameterDefinition: typeof CallSignatureParameterDefinition) => void;
    // ReturnTyped
    returnTypeExpression: TypeExpression;
    fillReturnTypeExpressionBySymbol: (mainCache: MainCache, symbolNode: ISymbolNode) => void;
    fillReturnTypeExpressionBySignature: (mainCache: MainCache, signature: ISignature) => void;
    // TypeParameteredDefinition
    typeParameters: ArrayExt<TypeParameterDefinition<this>>;
    fillTypeParametersBySymbol: (mainCache: MainCache, symbolNode: ISymbolNode) => void;
    fillTypeParametersBySignature: (mainCache: MainCache, signature: ISignature) => void;
}

applyMixins(CallSignatureDefinition, [TypeParameteredDefinition, ParameteredDefinition, ReturnTypedDefinition]);
