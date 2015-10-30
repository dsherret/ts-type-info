// This file was manually created because I couldn't find a good solution to automatically create it :(
declare module 'type-info-ts' {
    class Type {
        name: string;
    }

    class NamedDefinition {
        decorators: DecoratorDefinition[];
        name: string;
    }

    class TypedDefinition {
        type: Type;
    }

    class DecoratedDefinition {
        decorators: DecoratorDefinition[];
    }

    class ScopedDefinition {
        scope: Scope;
    }

    class ClassDefinition implements NamedDefinition, DecoratedDefinition {
        methods: MethodDefinition[];
        properties: PropertyDefinition[];
        baseClasses: ClassDefinition[];

        name: string;
        decorators: DecoratorDefinition[];
    }

    class MethodDefinition implements NamedDefinition, DecoratedDefinition, ScopedDefinition {
        parameters: ParameterDefinition[];

        name: string;
        decorators: DecoratorDefinition[];
        scope: Scope;
    }
    
    class ParameterDefinition implements TypedDefinition, NamedDefinition, DecoratedDefinition {
        name: string;
        decorators: DecoratorDefinition[];
        type: Type;
    }

    class PropertyDefinition implements TypedDefinition, NamedDefinition, DecoratedDefinition, ScopedDefinition {
        name: string;
        decorators: DecoratorDefinition[];
        scope: Scope;
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

    export enum Scope {
        public,
        protected,
        private
    }

    export function getFileInfo(...fileNames: string[]): FileDefinition[];
}
