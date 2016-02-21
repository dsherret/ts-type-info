import {Type} from "./../../expressions";
import {ISymbolNode} from "./../../wrappers";
import {MainFactory} from "./../../factories";
import {DefinitionType} from "./../base";
import {BasePropertyDefinition} from "./../base/base-property-definition";

export class TypePropertyDefinition extends BasePropertyDefinition<Type> {
    constructor(mainFactory: MainFactory, symbolNode: ISymbolNode, parent: Type) {
        super(mainFactory, symbolNode, parent, DefinitionType.TypeProperty);
    }
}
