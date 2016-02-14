import {BasePropertyDefinition} from "./../base/base-property-definition";
import {Type} from "./../../expressions";
import {DefinitionType} from "./../base";
import {WrappedSymbolNode} from "./../../wrappers";

export class TypePropertyDefinition extends BasePropertyDefinition<Type> {
    constructor(symbolNode: WrappedSymbolNode, parent: Type) {
        super(symbolNode, parent, DefinitionType.TypeProperty);
    }
}
