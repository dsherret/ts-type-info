import * as ts from "typescript";
import {DecoratorDefinition} from "./../../definitions";
import {applyMixins, TypeChecker} from "./../../utils";
import {IDecoratableDefinition, DecoratableDefinition} from "./../base";
import {ClassMethodDefinition} from "./class-method-definition";
import {BaseParameterDefinition} from "./../function";

export class ClassMethodParameterDefinition extends BaseParameterDefinition<ClassMethodDefinition> implements IDecoratableDefinition<ClassMethodParameterDefinition> {
    constructor(typeChecker: TypeChecker, symbol: ts.Symbol) {
        super(typeChecker, symbol);
        this.fillDecorators(typeChecker, symbol);
    }

    // DecoratableDefinition
    fillDecorators: (typeChecker: TypeChecker, symbol: ts.Symbol) => void;
    decorators: DecoratorDefinition<ClassMethodParameterDefinition>[];
}

applyMixins(ClassMethodParameterDefinition, [DecoratableDefinition]);
