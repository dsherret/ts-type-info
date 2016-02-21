import {Type} from "./../../expressions";
import {ISymbolNode} from "./../../wrappers";
import {MainCache} from "./../../utils";
import {DefinitionType} from "./../base";
import {BasePropertyDefinition} from "./../base/base-property-definition";

export class TypePropertyDefinition extends BasePropertyDefinition<Type> {
    constructor(mainCache: MainCache, symbolNode: ISymbolNode, parent: Type) {
        super(mainCache, symbolNode, parent, DefinitionType.TypeProperty);
    }
}
