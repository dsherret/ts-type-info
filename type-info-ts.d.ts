// This file was manually created because I couldn't find a good solution to automatically create it :(
declare module "type-info-ts" {
    class Type {
        name: string;
        properties: PropertyDefinition[];
    }

    class NamedDefinition {
        name: string;
    }

    class TypedDefinition {
        type: Type;
    }

    class DecoratedDefinition {
        decorators: DecoratorDefinition[];
    }

    class ParameteredDefinition {
        parameters: ParameterDefinition[];
    }

    class ReturnTypedDefinition {
        returnType: Type;
    }

    class ScopedDefinition {
        scope: Scope;
    }

    class ClassDefinition implements NamedDefinition, DecoratedDefinition {
        methods: MethodDefinition[];
        properties: ClassPropertyDefinition[];
        baseClasses: ClassDefinition[];

        name: string;
        decorators: DecoratorDefinition[];
        typeParameter: TypeParameterDefinition;
    }

    class ConstructorDefinition implements ParameteredDefinition {
        parameters: ParameterDefinition[];
    }

    class MethodDefinition implements NamedDefinition, DecoratedDefinition, ParameteredDefinition, ReturnTypedDefinition, ScopedDefinition {
        name: string;
        decorators: DecoratorDefinition[];
        parameters: ParameterDefinition[];
        returnType: Type;
        scope: Scope;
    }
    
    class ParameterDefinition implements TypedDefinition, NamedDefinition, DecoratedDefinition {
        name: string;
        decorators: DecoratorDefinition[];
        type: Type;
    }

    class ClassPropertyDefinition extends PropertyDefinition implements DecoratedDefinition, ScopedDefinition {
        decorators: DecoratorDefinition[];
        scope: Scope;
    }

    class PropertyDefinition implements TypedDefinition, NamedDefinition {
        name: string;
        type: Type;
    }

    class FileDefinition {
        name: string;
        classes: ClassDefinition[];
    }

    class DecoratorDefinition {
        name: string;
        arguments: ArgumentDefinition[];
    }

    class ArgumentDefinition {
        text: string;
    }

    class TypeParameterDefinition implements NamedDefinition {
        constraint: Type;
        name: string;
    }

    export enum Scope {
        public,
        protected,
        private
    }

    export function getFileInfo(...fileNames: string[]): FileDefinition[];
}
