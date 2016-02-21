import {ISymbolNode} from "./../../wrappers";
import {IDefinitionFactory} from "./../../factories";
import {BasePropertyDefinition, DefinitionType} from "./../base";
import {InterfaceDefinition} from "./interface-definition";

export class InterfacePropertyDefinition extends BasePropertyDefinition<InterfaceDefinition> {
    constructor(definitionFactory: IDefinitionFactory, symbolNode: ISymbolNode, parent: InterfaceDefinition) {
        super(definitionFactory, symbolNode, parent, DefinitionType.InterfaceProperty);
    }
}
