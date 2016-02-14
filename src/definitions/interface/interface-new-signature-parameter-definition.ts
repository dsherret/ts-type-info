import {WrappedSymbolNode} from "./../../wrappers";
import {DefinitionType, BaseParameterDefinition} from "./../base";
import {InterfaceNewSignatureDefinition} from "./interface-new-signature-definition";

export class InterfaceNewSignatureParameterDefinition extends BaseParameterDefinition<InterfaceNewSignatureDefinition> {
    constructor(symbolNode: WrappedSymbolNode, parent: InterfaceNewSignatureDefinition) {
        super(symbolNode, parent, DefinitionType.InterfaceNewSignatureParameter);
    }
}
