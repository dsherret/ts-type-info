import {DefinitionType, BaseFunctionDefinition} from "./../base";
import {INode} from "./../../wrappers";
import {MainFactory} from "./../../factories";
import {InterfaceDefinition} from "./InterfaceDefinition";
import {InterfaceMethodParameterDefinition} from "./InterfaceMethodParameterDefinition";

export class InterfaceMethodDefinition extends BaseFunctionDefinition<InterfaceDefinition, InterfaceMethodParameterDefinition> {
    constructor(mainFactory: MainFactory, node: INode, parent: InterfaceDefinition) {
        super(mainFactory, node, InterfaceMethodParameterDefinition, DefinitionType.InterfaceMethod);
        this.parent = parent;
    }
}
