import {applyMixins, ArrayExt} from "./../../utils";
import {MainFactory} from "./../../factories";
import {INode} from "./../../wrappers";
import {DecoratorDefinition} from "./../general";
import {IDecoratableDefinition, DecoratableDefinition, DefinitionType, BaseParameterDefinition} from "./../base";
import {ClassConstructorDefinition} from "./ClassConstructorDefinition";
import {ClassConstructorParameterScope} from "./ClassConstructorParameterScope";

export class ClassConstructorParameterDefinition extends BaseParameterDefinition<ClassConstructorDefinition> implements IDecoratableDefinition {
    scope: ClassConstructorParameterScope;

    constructor(mainFactory: MainFactory, node: INode, parent: ClassConstructorDefinition) {
        super(mainFactory, node, parent, DefinitionType.ClassConstructorParameter);
        this.fillDecorators(node);
        this.scope = node.getClassConstructorParameterScope();
    }

    // DecoratableDefinition
    fillDecorators: (node: INode) => void;
    decorators: ArrayExt<DecoratorDefinition<this>>;
}

applyMixins(ClassConstructorParameterDefinition, [DecoratableDefinition]);
