import {ISymbolNode} from "./../../wrappers";
import {MainFactory} from "./../../factories";
import {BasePropertyDefinition, DefinitionType} from "./../base";
import {InterfaceDefinition} from "./interface-definition";

export class InterfacePropertyDefinition extends BasePropertyDefinition<InterfaceDefinition> {
    constructor(mainFactory: MainFactory, symbolNode: ISymbolNode, parent: InterfaceDefinition) {
        super(mainFactory, symbolNode, parent, DefinitionType.InterfaceProperty);
    }
}
