import {Type} from "./../../expressions";
import {INode} from "./../../wrappers";
import {MainFactory} from "./../../factories";
import {DefinitionType} from "./../base";
import {BasePropertyDefinition} from "./../base/base-property-definition";

export class TypePropertyDefinition extends BasePropertyDefinition<Type> {
    constructor(mainFactory: MainFactory, node: INode, parent: Type) {
        super(mainFactory, node, parent, DefinitionType.TypeProperty);
    }
}
