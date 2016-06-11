import {StructureFactory} from "./../../factories";
import {applyMixins} from "./../../utils";
import {DecoratorStructure} from "./../../structures";
import {DecoratorDefinition} from "./../general";
import {DecoratableDefinition, DefinitionType, BaseParameterDefinition} from "./../base";
import {ClassConstructorParameterScope} from "./ClassConstructorParameterScope";

export class ClassConstructorParameterDefinition extends BaseParameterDefinition implements DecoratableDefinition {
    scope: ClassConstructorParameterScope;

    constructor() {
        super(DefinitionType.ClassConstructorParameter);
    }

    toClassProperty() {
        const factory = new StructureFactory();
        const def = factory.getClassProperty({
            name: this.name,
            scope: ClassConstructorParameterScope.toScope(this.scope),
            type: this.type.text,
            isOptional: this.isOptional,
            defaultExpression: this.defaultExpression != null ? this.defaultExpression.text : null,
            decorators: this.decorators.map(decorator => ({
                name: decorator.name,
                arguments: decorator.arguments.map(arg => arg.text)
            }))
        });

        return def;
    }

    // DecoratableDefinition
    decorators: DecoratorDefinition[];
    addDecorator: (structure: DecoratorStructure) => DecoratorDefinition;
    getDecorator: (nameOrSearchFunction: string | ((decorator: DecoratorDefinition) => boolean)) => DecoratorDefinition;
}

applyMixins(ClassConstructorParameterDefinition, BaseParameterDefinition, [DecoratableDefinition]);
