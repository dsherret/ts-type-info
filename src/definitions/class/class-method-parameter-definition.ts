import * as ts from "typescript";
import {DecoratorDefinition} from "./../../definitions";
import {applyMixins, TypeChecker} from "./../../utils";
import {IDecoratableDefinition, DecoratableDefinition} from "./../base";
import {BaseParameterDefinition} from "./../function";

export class ClassMethodParameterDefinition extends BaseParameterDefinition implements IDecoratableDefinition {
    constructor(typeChecker: TypeChecker, symbol: ts.Symbol) {
        super(typeChecker, symbol);
        this.fillDecorators(typeChecker, symbol);
    }

    // DecoratableDefinition
    fillDecorators: (typeChecker: TypeChecker, symbol: ts.Symbol) => void;
    decorators: DecoratorDefinition[];
}

applyMixins(ClassMethodParameterDefinition, [DecoratableDefinition]);
