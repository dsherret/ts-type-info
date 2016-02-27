import {INode} from "./../../wrappers";
import {MainFactory} from "./../../factories";
import {DefinitionType} from "./../base";
import {BaseClassMethodParameterDefinition} from "./base";
import {ClassMethodDefinition} from "./class-method-definition";

export class ClassMethodParameterDefinition extends BaseClassMethodParameterDefinition<ClassMethodDefinition> {
    constructor(mainFactory: MainFactory, node: INode, parent: ClassMethodDefinition) {
        super(mainFactory, node, parent, DefinitionType.ClassMethodParameter);
    }
}
