import {DefinitionType, BaseFunctionDefinition} from "./../base";
import {ISymbolNode} from "./../../wrappers";
import {MainFactory} from "./../../factories";
import {InterfaceDefinition} from "./interface-definition";
import {InterfaceMethodParameterDefinition} from "./interface-method-parameter-definition";

export class InterfaceMethodDefinition extends BaseFunctionDefinition<InterfaceDefinition, InterfaceMethodParameterDefinition> {
    constructor(mainFactory: MainFactory, symbolNode: ISymbolNode, parent: InterfaceDefinition) {
        super(mainFactory, symbolNode, InterfaceMethodParameterDefinition, DefinitionType.InterfaceMethod);
        this.parent = parent;
    }
}
