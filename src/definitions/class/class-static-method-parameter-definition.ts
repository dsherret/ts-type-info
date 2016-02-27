﻿import {INode} from "./../../wrappers";
import {MainFactory} from "./../../factories";
import {DefinitionType} from "./../base";
import {BaseClassMethodParameterDefinition} from "./base";
import {ClassStaticMethodDefinition} from "./class-static-method-definition";

export class ClassStaticMethodParameterDefinition extends BaseClassMethodParameterDefinition<ClassStaticMethodDefinition> {
    constructor(mainFactory: MainFactory, node: INode, parent: ClassStaticMethodDefinition) {
        super(mainFactory, node, parent, DefinitionType.ClassStaticMethodParameter);
    }
}
