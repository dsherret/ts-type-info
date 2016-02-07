import * as ts from "typescript";
import {applyMixins, TypeChecker} from "./../../utils";
import {DecoratorDefinition} from "./../general";
import {IDecoratableDefinition, DecoratableDefinition, DefinitionType, BaseParameterDefinition} from "./../base";
import {ClassConstructorDefinition} from "./class-constructor-definition";

export class ClassConstructorParameterDefinition extends BaseParameterDefinition<ClassConstructorDefinition> implements IDecoratableDefinition {
    constructor(typeChecker: TypeChecker, symbol: ts.Symbol, parent: ClassConstructorDefinition) {
        super(typeChecker, symbol, parent, DefinitionType.ClassConstructorParameter);
        this.fillDecorators(typeChecker, symbol);
    }

    // DecoratableDefinition
    fillDecorators: (typeChecker: TypeChecker, symbol: ts.Symbol) => void;
    decorators: DecoratorDefinition<this>[];
}

applyMixins(ClassConstructorParameterDefinition, [DecoratableDefinition]);
