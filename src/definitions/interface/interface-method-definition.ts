import {DefinitionType, BaseFunctionDefinition} from "./../base";
import {ISymbolNode} from "./../../wrappers";
import {MainCache} from "./../../utils";
import {InterfaceDefinition} from "./interface-definition";
import {InterfaceMethodParameterDefinition} from "./interface-method-parameter-definition";

export class InterfaceMethodDefinition extends BaseFunctionDefinition<InterfaceDefinition, InterfaceMethodParameterDefinition> {
    constructor(mainCache: MainCache, symbolNode: ISymbolNode, parent: InterfaceDefinition) {
        super(mainCache, symbolNode, InterfaceMethodParameterDefinition, DefinitionType.InterfaceMethod);
        this.parent = parent;
    }
}
