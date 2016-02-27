import {INode, ISignature} from "./../../wrappers";
import {TypeExpression} from "./../../expressions";
import {applyMixins, ArrayExt} from "./../../utils";
import {MainFactory} from "./../../factories";
import {ITypeParameteredDefinition, TypeParameteredDefinition, BaseDefinition, DefinitionType,
        IReturnTypedDefinition, ReturnTypedDefinition, IParameteredDefinition, ParameteredDefinition} from "./../base";
import {TypeParameterDefinition} from "./../general";
import {CallSignatureParameterDefinition} from "./call-signature-parameter-definition";

export class CallSignatureDefinition
        extends BaseDefinition
        implements ITypeParameteredDefinition, IParameteredDefinition<CallSignatureParameterDefinition>, IReturnTypedDefinition {
    minArgumentCount: number;

    constructor(mainFactory: MainFactory, signature: ISignature) {
        super(DefinitionType.CallSignature);
        this.fillReturnTypeExpressionBySignature(mainFactory, signature);
        this.fillParametersBySignature(mainFactory, signature, CallSignatureParameterDefinition);
        this.fillTypeParametersBySignature(mainFactory, signature);

        this.minArgumentCount = signature.getMinArgumentCount();
    }

    // ParameteredDefinition
    parameters: ArrayExt<CallSignatureParameterDefinition>;
    fillParametersBySymbol: (
        mainFactory: MainFactory,
        node: INode,
        parameterDefinition: typeof CallSignatureParameterDefinition) => void;
    fillParametersBySignature: (
        mainFactory: MainFactory,
        signature: ISignature,
        parameterDefinition: typeof CallSignatureParameterDefinition) => void;
    // ReturnTyped
    returnTypeExpression: TypeExpression;
    fillReturnTypeExpressionBySymbol: (mainFactory: MainFactory, node: INode) => void;
    fillReturnTypeExpressionBySignature: (mainFactory: MainFactory, signature: ISignature) => void;
    // TypeParameteredDefinition
    typeParameters: ArrayExt<TypeParameterDefinition<this>>;
    fillTypeParametersBySymbol: (mainFactory: MainFactory, node: INode) => void;
    fillTypeParametersBySignature: (mainFactory: MainFactory, signature: ISignature) => void;
}

applyMixins(CallSignatureDefinition, [TypeParameteredDefinition, ParameteredDefinition, ReturnTypedDefinition]);
