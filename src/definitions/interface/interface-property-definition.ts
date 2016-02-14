import {WrappedSymbolNode} from "./../../wrappers";
import {BasePropertyDefinition, DefinitionType} from "./../base";
import {InterfaceDefinition} from "./interface-definition";

export class InterfacePropertyDefinition extends BasePropertyDefinition<InterfaceDefinition> {
    constructor(symbolNode: WrappedSymbolNode, parent: InterfaceDefinition) {
        super(symbolNode, parent, DefinitionType.InterfaceProperty);
    }
}
