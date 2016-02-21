import {ISymbolNode} from "./../../wrappers";
import {MainFactory} from "./../../factories";
import {DefinitionType, BaseParameterDefinition} from "./../base";
import {InterfaceNewSignatureDefinition} from "./interface-new-signature-definition";

export class InterfaceNewSignatureParameterDefinition extends BaseParameterDefinition<InterfaceNewSignatureDefinition> {
    constructor(mainFactory: MainFactory, symbolNode: ISymbolNode, parent: InterfaceNewSignatureDefinition) {
        super(mainFactory, symbolNode, parent, DefinitionType.InterfaceNewSignatureParameter);
    }
}
