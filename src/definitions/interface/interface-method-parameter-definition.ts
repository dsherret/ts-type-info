import {ISymbolNode} from "./../../wrappers";
import {MainFactory} from "./../../factories";
import {DefinitionType, BaseParameterDefinition} from "./../base";
import {InterfaceMethodDefinition} from "./interface-method-definition";

export class InterfaceMethodParameterDefinition extends BaseParameterDefinition<InterfaceMethodDefinition> {
    constructor(mainFactory: MainFactory, symbolNode: ISymbolNode, parent: InterfaceMethodDefinition) {
        super(mainFactory, symbolNode, parent, DefinitionType.InterfaceMethodParameter);
    }
}
