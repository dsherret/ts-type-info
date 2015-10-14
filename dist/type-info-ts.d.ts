// This file was manually created because I couldn't find a good solution to automatically create it :(
declare module 'type-info-ts' {
	class Type {
	    private _name;
	    name: string;
	}

	class NamedDefinition {
	    private _decorators;
	    private _name;
	    decorators: DecoratorDefinition[];
	    name: string;
	}
    
    class TypedDefinition extends NamedDefinition {
	    private _type;
	    type: Type;
	}

	class ClassDefinition extends NamedDefinition {
	    private _methods;
	    private _properties;
		private _baseClasses;
	    methods: MethodDefinition[];
	    properties: PropertyDefinition[];
		baseClasses: ClassDefinition[];
	}

	class MethodDefinition extends NamedDefinition {
	    private _parameters;
	    parameters: ParameterDefinition[];
	}
    
	class ParameterDefinition extends TypedDefinition {
	}

	class PropertyDefinition extends TypedDefinition {
	}

	class FileDefinition {
	    private _name;
	    private _classes;
	    name: string;
	    classes: ClassDefinition[];
	}

	class DecoratorDefinition {
	    private _name;
	    private _arguments;
	    name: string;
	    arguments: ArgumentDefinition[];
	}

	class ArgumentDefinition {
	    private _text;
	    text: string;
	}

	export function getFileInfo(...fileNames: string[]): FileDefinition[];
}
