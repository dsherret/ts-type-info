import {INode} from "./../../wrappers";
import {MainFactory} from "./../../factories";
import {DefinitionType} from "./../base";
import {BaseClassPropertyDefinition} from "./base";
import {ClassDefinition} from "./ClassDefinition";

export class ClassStaticPropertyDefinition extends BaseClassPropertyDefinition {
    constructor(mainFactory: MainFactory, node: INode, parent: ClassDefinition) {
        super(mainFactory, node, parent, DefinitionType.ClassStaticProperty);
    }
}
