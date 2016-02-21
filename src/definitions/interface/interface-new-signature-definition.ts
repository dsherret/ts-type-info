import {IParentedDefinition, BaseDefinition, DefinitionType, IParameteredDefinition, ParameteredDefinition, ReturnTypedDefinition, IReturnTypedDefinition} from "./../base";
import {TypeExpression} from "./../../expressions";
import {applyMixins, ArrayExt, MainCache} from "./../../utils";
import {ISymbolNode, ISignature} from "./../../wrappers";
import {InterfaceNewSignatureParameterDefinition} from "./interface-new-signature-parameter-definition";
import {InterfaceDefinition} from "./interface-definition";

export class InterfaceNewSignatureDefinition
        extends BaseDefinition
        implements IParameteredDefinition<InterfaceNewSignatureParameterDefinition>, IReturnTypedDefinition,
                   IParentedDefinition<InterfaceDefinition> {

    constructor(mainCache: MainCache, signature: ISignature, parent: InterfaceDefinition) {
        super(DefinitionType.InterfaceNewSignature);
        this.fillParametersBySignature(mainCache, signature, InterfaceNewSignatureParameterDefinition);
        this.fillReturnTypeExpressionBySignature(mainCache, signature);
        this.parent = parent;
    }

    // ParentedDefinition
    parent: InterfaceDefinition;
    // ParameteredDefinition
    parameters: ArrayExt<InterfaceNewSignatureParameterDefinition>;
    fillParametersBySymbol: (
        mainCache: MainCache,
        symbolNode: ISymbolNode,
        parameterDefinition: typeof InterfaceNewSignatureParameterDefinition) => void;
    fillParametersBySignature: (
        mainCache: MainCache,
        signature: ISignature,
        parameterDefinition: typeof InterfaceNewSignatureParameterDefinition) => void;
    // ReturnTyped
    returnTypeExpression: TypeExpression;
    fillReturnTypeExpressionBySymbol: (mainCache: MainCache, symbolNode: ISymbolNode) => void;
    fillReturnTypeExpressionBySignature: (mainCache: MainCache, signature: ISignature) => void;
}

applyMixins(InterfaceNewSignatureDefinition, [ParameteredDefinition, ReturnTypedDefinition]);
