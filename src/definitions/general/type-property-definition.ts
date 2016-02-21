import {Type} from "./../../expressions";
import {ISymbolNode} from "./../../wrappers";
import {IDefinitionFactory} from "./../../factories";
import {DefinitionType} from "./../base";
import {BasePropertyDefinition} from "./../base/base-property-definition";

export class TypePropertyDefinition extends BasePropertyDefinition<Type> {
    constructor(definitionFactory: IDefinitionFactory, symbolNode: ISymbolNode, parent: Type) {
        super(definitionFactory, symbolNode, parent, DefinitionType.TypeProperty);
    }
}
