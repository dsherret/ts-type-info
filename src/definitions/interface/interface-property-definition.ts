import {INode} from "./../../wrappers";
import {MainFactory} from "./../../factories";
import {BasePropertyDefinition, DefinitionType} from "./../base";
import {InterfaceDefinition} from "./interface-definition";

export class InterfacePropertyDefinition extends BasePropertyDefinition<InterfaceDefinition> {
    constructor(mainFactory: MainFactory, node: INode, parent: InterfaceDefinition) {
        super(mainFactory, node, parent, DefinitionType.InterfaceProperty);
    }
}
