import {ISymbolNode} from "./../../wrappers";
import {MainCache} from "./../../utils";
import {DefinitionType, BaseParameterDefinition} from "./../base";
import {InterfaceMethodDefinition} from "./interface-method-definition";

export class InterfaceMethodParameterDefinition extends BaseParameterDefinition<InterfaceMethodDefinition> {
    constructor(mainCache: MainCache, symbolNode: ISymbolNode, parent: InterfaceMethodDefinition) {
        super(mainCache, symbolNode, parent, DefinitionType.InterfaceMethodParameter);
    }
}
