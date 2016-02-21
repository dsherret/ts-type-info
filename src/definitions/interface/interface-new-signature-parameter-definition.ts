import {ISymbolNode} from "./../../wrappers";
import {MainCache} from "./../../utils";
import {DefinitionType, BaseParameterDefinition} from "./../base";
import {InterfaceNewSignatureDefinition} from "./interface-new-signature-definition";

export class InterfaceNewSignatureParameterDefinition extends BaseParameterDefinition<InterfaceNewSignatureDefinition> {
    constructor(mainCache: MainCache, symbolNode: ISymbolNode, parent: InterfaceNewSignatureDefinition) {
        super(mainCache, symbolNode, parent, DefinitionType.InterfaceNewSignatureParameter);
    }
}
