import {WrappedSymbolNode} from "./../../wrappers";
import {DefinitionType, BaseParameterDefinition} from "./../base";
import {InterfaceMethodDefinition} from "./interface-method-definition";

export class InterfaceMethodParameterDefinition extends BaseParameterDefinition<InterfaceMethodDefinition> {
    constructor(symbolNode: WrappedSymbolNode, parent: InterfaceMethodDefinition) {
        super(symbolNode, parent, DefinitionType.InterfaceMethodParameter);
    }
}
