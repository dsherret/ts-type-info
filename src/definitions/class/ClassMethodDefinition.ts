import {applyMixins} from "./../../utils";
import {MainFactory} from "./../../factories";
import {INode} from "./../../wrappers";
import {DefinitionType, IAbstractableDefinition, AbstractableDefinition} from "./../base";
import {BaseClassMethodDefinition} from "./base";
import {ClassMethodParameterDefinition} from "./ClassMethodParameterDefinition";
import {ClassDefinition} from "./ClassDefinition";

export class ClassMethodDefinition extends BaseClassMethodDefinition<ClassMethodParameterDefinition> implements IAbstractableDefinition {
    constructor(mainFactory: MainFactory, node: INode, parent: ClassDefinition) {
        super(mainFactory, node, ClassMethodParameterDefinition, parent, DefinitionType.ClassMethod);
        this.fillAbstractable(node);
    }

    // AbstractableDefinition
    isAbstract: boolean;
    fillAbstractable: (node: INode) => void;
}

applyMixins(ClassMethodDefinition, [AbstractableDefinition]);
