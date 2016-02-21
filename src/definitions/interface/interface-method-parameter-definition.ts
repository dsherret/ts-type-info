import {ISymbolNode} from "./../../wrappers";
import {IDefinitionFactory} from "./../../factories";
import {DefinitionType, BaseParameterDefinition} from "./../base";
import {InterfaceMethodDefinition} from "./interface-method-definition";

export class InterfaceMethodParameterDefinition extends BaseParameterDefinition<InterfaceMethodDefinition> {
    constructor(definitionFactory: IDefinitionFactory, symbolNode: ISymbolNode, parent: InterfaceMethodDefinition) {
        super(definitionFactory, symbolNode, parent, DefinitionType.InterfaceMethodParameter);
    }
}
