declare module 'type-info-ts/utils/decorators' {
	export function Serializable(target: any, propertyName: string, descriptor: TypedPropertyDescriptor<any>): void;

}
declare module 'type-info-ts/types/type' {
	import * as ts from "typescript";
	export class Type {
	    private _name;
	    constructor(typeChecker: ts.TypeChecker, type: ts.Type, node: ts.Node);
	    name: string;
	}

}
declare module 'type-info-ts/types' {
	export * from 'type-info-ts/types/type';

}
declare module 'type-info-ts/utils/type-checker' {
	import * as ts from "typescript";
	import { Type } from 'type-info-ts/types';
	export class TypeChecker {
	    private typeChecker;
	    private node;
	    constructor(typeChecker: ts.TypeChecker, node: ts.Node);
	    getSymbolAtLocation(node: ts.Node): ts.Symbol;
	    getTypeOfSymbol(symbol: ts.Symbol): Type;
	}

}
declare module 'type-info-ts/utils' {
	export * from 'type-info-ts/utils/type-checker';
	export * from 'type-info-ts/utils/type-guards';
	export * from 'type-info-ts/utils/decorators';

}
declare module 'type-info-ts/definitions/class-definition' {
	import * as ts from "typescript";
	import { NamedDefinition, MethodDefinition, PropertyDefinition } from 'type-info-ts/definitions';
	import { TypeChecker } from 'type-info-ts/utils';
	export class ClassDefinition extends NamedDefinition {
	    private _methods;
	    private _properties;
	    constructor(typeChecker: TypeChecker, symbol: ts.Symbol);
	    methods: MethodDefinition[];
	    properties: PropertyDefinition[];
	    private createMembers(typeChecker, symbol);
	    static isClassDefinition(symbol: ts.Symbol): boolean;
	}

}
declare module 'type-info-ts/definitions/method-definition' {
	import * as ts from "typescript";
	import { NamedDefinition, ParameterDefinition } from 'type-info-ts/definitions';
	import { TypeChecker } from 'type-info-ts/utils';
	export class MethodDefinition extends NamedDefinition {
	    private _parameters;
	    constructor(typeChecker: TypeChecker, symbol: ts.Symbol);
	    parameters: ParameterDefinition[];
	    static isClassMethod(symbol: ts.Symbol): boolean;
	}

}
declare module 'type-info-ts/definitions/parameter-definition' {
	import * as ts from "typescript";
	import { TypedDefinition } from 'type-info-ts/definitions';
	import { TypeChecker } from 'type-info-ts/utils';
	export class ParameterDefinition extends TypedDefinition {
	    constructor(typeChecker: TypeChecker, paramSymbol: ts.Symbol);
	}

}
declare module 'type-info-ts/definitions/property-definition' {
	import * as ts from "typescript";
	import { TypedDefinition } from 'type-info-ts/definitions';
	import { TypeChecker } from 'type-info-ts/utils';
	export class PropertyDefinition extends TypedDefinition {
	    constructor(typeChecker: TypeChecker, symbol: ts.Symbol);
	    static isProperty(symbol: ts.Symbol): boolean;
	}

}
declare module 'type-info-ts/definitions/file-definition' {
	import * as ts from "typescript";
	import { TypeChecker } from 'type-info-ts/utils';
	import { ClassDefinition } from 'type-info-ts/definitions';
	export class FileDefinition {
	    private _name;
	    private _classes;
	    constructor(typeChecker: TypeChecker, file: ts.SourceFile);
	    name: string;
	    classes: ClassDefinition[];
	    private checkAnyClassExports();
	}

}
declare module 'type-info-ts/definitions/decorator-definition' {
	import * as ts from "typescript";
	import { ArgumentDefinition } from 'type-info-ts/definitions';
	export class DecoratorDefinition {
	    private _name;
	    private _arguments;
	    constructor(decorator: ts.Decorator);
	    name: string;
	    arguments: ArgumentDefinition[];
	    private fillName(decoratorExpression);
	    private fillArguments(args);
	}

}
declare module 'type-info-ts/definitions/argument-definition' {
	import * as ts from "typescript";
	export class ArgumentDefinition {
	    private _text;
	    constructor(arg: ts.Expression);
	    text: string;
	    private fillName(arg);
	    private isSupported(arg);
	}

}
declare module 'type-info-ts/definitions' {
	export * from 'type-info-ts/definitions/named-definition';
	export * from 'type-info-ts/definitions/typed-definition';
	export * from 'type-info-ts/definitions/class-definition';
	export * from 'type-info-ts/definitions/method-definition';
	export * from 'type-info-ts/definitions/parameter-definition';
	export * from 'type-info-ts/definitions/property-definition';
	export * from 'type-info-ts/definitions/file-definition';
	export * from 'type-info-ts/definitions/decorator-definition';
	export * from 'type-info-ts/definitions/argument-definition';

}
declare module 'type-info-ts/main' {
	import { FileDefinition } from 'type-info-ts/definitions';
	export function getFileInfo(...fileNames: string[]): FileDefinition[];

}
declare module 'type-info-ts' {
	import main = require('type-info-ts/main');
	export = main;
}
