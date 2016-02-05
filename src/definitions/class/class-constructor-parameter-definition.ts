import * as ts from "typescript";
import {DecoratorDefinition} from "./../general";
import {IDecoratableDefinition, DecoratableDefinition, DefinitionType} from "./../base";
import {ClassConstructorDefinition} from "./class-constructor-definition";
import {BaseParameterDefinition} from "./../function";
import {applyMixins, TypeChecker} from "./../../utils";

export class ClassConstructorParameterDefinition extends BaseParameterDefinition<ClassConstructorDefinition> implements IDecoratableDefinition {
    constructor(typeChecker: TypeChecker, symbol: ts.Symbol, parent: ClassConstructorDefinition) {
        super(typeChecker, symbol, parent, DefinitionType.ClassConstructorParameter);
        this.fillDecorators(typeChecker, symbol, this);
    }

    // DecoratableDefinition
    fillDecorators: (typeChecker: TypeChecker, symbol: ts.Symbol, parent: this) => void;
    decorators: DecoratorDefinition<this>[];
}

applyMixins(ClassConstructorParameterDefinition, [DecoratableDefinition]);
