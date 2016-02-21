import {ISymbolNode} from "./../../wrappers";
import {MainCache} from "./../../utils";
import {BasePropertyDefinition, DefinitionType} from "./../base";
import {InterfaceDefinition} from "./interface-definition";

export class InterfacePropertyDefinition extends BasePropertyDefinition<InterfaceDefinition> {
    constructor(mainCache: MainCache, symbolNode: ISymbolNode, parent: InterfaceDefinition) {
        super(mainCache, symbolNode, parent, DefinitionType.InterfaceProperty);
    }
}
