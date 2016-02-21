import {DefinitionType, BaseFunctionDefinition} from "./../base";
import {ISymbolNode} from "./../../wrappers";
import {IDefinitionFactory} from "./../../factories";
import {InterfaceDefinition} from "./interface-definition";
import {InterfaceMethodParameterDefinition} from "./interface-method-parameter-definition";

export class InterfaceMethodDefinition extends BaseFunctionDefinition<InterfaceDefinition, InterfaceMethodParameterDefinition> {
    constructor(definitionFactory: IDefinitionFactory, symbolNode: ISymbolNode, parent: InterfaceDefinition) {
        super(definitionFactory, symbolNode, InterfaceMethodParameterDefinition, DefinitionType.InterfaceMethod);
        this.parent = parent;
    }
}
