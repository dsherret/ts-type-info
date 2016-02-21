import {IParentedDefinition, BaseDefinition, DefinitionType, IParameteredDefinition, ParameteredDefinition, ReturnTypedDefinition, IReturnTypedDefinition} from "./../base";
import {TypeExpression} from "./../../expressions";
import {applyMixins, ArrayExt} from "./../../utils";
import {MainFactory} from "./../../factories";
import {ISymbolNode, ISignature} from "./../../wrappers";
import {InterfaceNewSignatureParameterDefinition} from "./interface-new-signature-parameter-definition";
import {InterfaceDefinition} from "./interface-definition";

export class InterfaceNewSignatureDefinition
        extends BaseDefinition
        implements IParameteredDefinition<InterfaceNewSignatureParameterDefinition>, IReturnTypedDefinition,
                   IParentedDefinition<InterfaceDefinition> {

    constructor(mainFactory: MainFactory, signature: ISignature, parent: InterfaceDefinition) {
        super(DefinitionType.InterfaceNewSignature);
        this.fillParametersBySignature(mainFactory, signature, InterfaceNewSignatureParameterDefinition);
        this.fillReturnTypeExpressionBySignature(mainFactory, signature);
        this.parent = parent;
    }

    // ParentedDefinition
    parent: InterfaceDefinition;
    // ParameteredDefinition
    parameters: ArrayExt<InterfaceNewSignatureParameterDefinition>;
    fillParametersBySymbol: (
        mainFactory: MainFactory,
        symbolNode: ISymbolNode,
        parameterDefinition: typeof InterfaceNewSignatureParameterDefinition) => void;
    fillParametersBySignature: (
        mainFactory: MainFactory,
        signature: ISignature,
        parameterDefinition: typeof InterfaceNewSignatureParameterDefinition) => void;
    // ReturnTyped
    returnTypeExpression: TypeExpression;
    fillReturnTypeExpressionBySymbol: (mainFactory: MainFactory, symbolNode: ISymbolNode) => void;
    fillReturnTypeExpressionBySignature: (mainFactory: MainFactory, signature: ISignature) => void;
}

applyMixins(InterfaceNewSignatureDefinition, [ParameteredDefinition, ReturnTypedDefinition]);
