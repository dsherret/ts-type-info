import {StructureFactory} from "./../../factories";
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

    toProperty() {
        const factory = new StructureFactory();
        const def = factory.getClassProperty({
            name: this.name,
            isConstructorParameter: true,
            scope: ClassConstructorParameterScope.toScope(this.scope),
            type: this.typeExpression.text,
            isOptional: this.isOptional,
            defaultExpression: this.defaultExpression != null ? this.defaultExpression.text : null,
            decorators: this.decorators.map(decorator => {
                return {
                    name: decorator.name,
                    arguments: decorator.arguments.map(arg => arg.text)
                };
            })
        });

        return def;
    }

    // DecoratableDefinition
    decorators: DecoratorDefinition<this>[];
}

applyMixins(ClassConstructorParameterDefinition, BaseParameterDefinition, [DecoratableDefinition]);
