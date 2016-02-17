import {DefinitionType, BaseFunctionDefinition} from "./../base";
import {WrappedSymbolNode} from "./../../wrappers";
import {InterfaceMethodParameterStructure} from "./../../structures";
import {InterfaceDefinition} from "./interface-definition";
import {InterfaceMethodParameterDefinition} from "./interface-method-parameter-definition";

export class InterfaceMethodDefinition extends BaseFunctionDefinition<InterfaceDefinition, InterfaceMethodParameterDefinition, InterfaceMethodParameterStructure> {
    constructor(symbolNode: WrappedSymbolNode, parent: InterfaceDefinition) {
        super(symbolNode, InterfaceMethodParameterDefinition, DefinitionType.InterfaceMethod);
        this.parent = parent;
    }
}
