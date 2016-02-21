import {ISymbolNode, ISignature} from "./../../wrappers";
import {TypeExpression} from "./../../expressions";
import {applyMixins, ArrayExt} from "./../../utils";
import {IDefinitionFactory} from "./../../factories";
import {ITypeParameteredDefinition, TypeParameteredDefinition, BaseDefinition, DefinitionType,
        IReturnTypedDefinition, ReturnTypedDefinition, IParameteredDefinition, ParameteredDefinition} from "./../base";
import {TypeParameterDefinition} from "./../general";
import {CallSignatureParameterDefinition} from "./call-signature-parameter-definition";

export class CallSignatureDefinition
        extends BaseDefinition
        implements ITypeParameteredDefinition, IParameteredDefinition<CallSignatureParameterDefinition>, IReturnTypedDefinition {
    minArgumentCount: number;

    constructor(definitionFactory: IDefinitionFactory, signature: ISignature) {
        super(DefinitionType.CallSignature);
        this.fillReturnTypeExpressionBySignature(definitionFactory, signature);
        this.fillParametersBySignature(definitionFactory, signature, CallSignatureParameterDefinition);
        this.fillTypeParametersBySignature(definitionFactory, signature);

        this.minArgumentCount = signature.getMinArgumentCount();
    }

    // ParameteredDefinition
    parameters: ArrayExt<CallSignatureParameterDefinition>;
    fillParametersBySymbol: (
        definitionFactory: IDefinitionFactory,
        symbolNode: ISymbolNode,
        parameterDefinition: typeof CallSignatureParameterDefinition) => void;
    fillParametersBySignature: (
        definitionFactory: IDefinitionFactory,
        signature: ISignature,
        parameterDefinition: typeof CallSignatureParameterDefinition) => void;
    // ReturnTyped
    returnTypeExpression: TypeExpression;
    fillReturnTypeExpressionBySymbol: (definitionFactory: IDefinitionFactory, symbolNode: ISymbolNode) => void;
    fillReturnTypeExpressionBySignature: (definitionFactory: IDefinitionFactory, signature: ISignature) => void;
    // TypeParameteredDefinition
    typeParameters: ArrayExt<TypeParameterDefinition<this>>;
    fillTypeParametersBySymbol: (definitionFactory: IDefinitionFactory, symbolNode: ISymbolNode) => void;
    fillTypeParametersBySignature: (definitionFactory: IDefinitionFactory, signature: ISignature) => void;
}

applyMixins(CallSignatureDefinition, [TypeParameteredDefinition, ParameteredDefinition, ReturnTypedDefinition]);
