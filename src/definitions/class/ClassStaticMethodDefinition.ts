import {INode} from "./../../wrappers";
import {MainFactory} from "./../../factories";
import {DefinitionType} from "./../base";
import {BaseClassMethodDefinition} from "./base";
import {ClassStaticMethodParameterDefinition} from "./ClassStaticMethodParameterDefinition";
import {ClassDefinition} from "./ClassDefinition";

export class ClassStaticMethodDefinition extends BaseClassMethodDefinition<ClassStaticMethodParameterDefinition> {
    constructor(mainFactory: MainFactory, node: INode, parent: ClassDefinition) {
        super(mainFactory, node, ClassStaticMethodParameterDefinition, parent, DefinitionType.ClassStaticMethod);
    }
}