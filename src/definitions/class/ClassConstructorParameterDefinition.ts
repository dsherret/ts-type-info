import {applyMixins} from "./../../utils";
import {DecoratorDefinition} from "./../general";
import {DecoratableDefinition, DefinitionType, BaseParameterDefinition} from "./../base";
import {ClassConstructorDefinition} from "./ClassConstructorDefinition";
import {ClassConstructorParameterScope} from "./ClassConstructorParameterScope";

export class ClassConstructorParameterDefinition extends BaseParameterDefinition<ClassConstructorDefinition> implements DecoratableDefinition {
    scope: ClassConstructorParameterScope;

    constructor() {
        super(DefinitionType.ClassConstructorParameter);
    }

    // DecoratableDefinition
    decorators: DecoratorDefinition<this>[];
}

applyMixins(ClassConstructorParameterDefinition, BaseParameterDefinition, [DecoratableDefinition]);
