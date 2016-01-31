import * as ts from "typescript";
import {DecoratorDefinition} from "./../../definitions";
import {applyMixins, TypeChecker} from "./../../utils";
import {IDecoratableDefinition, DecoratableDefinition} from "./../base";
import {ConstructorDefinition} from "./constructor-definition";
import {BaseParameterDefinition} from "./../function";

export class ConstructorParameterDefinition extends BaseParameterDefinition<ConstructorDefinition> implements IDecoratableDefinition<ConstructorParameterDefinition> {
    constructor(typeChecker: TypeChecker, symbol: ts.Symbol) {
        super(typeChecker, symbol);
        this.fillDecorators(typeChecker, symbol);
    }

    // DecoratableDefinition
    fillDecorators: (typeChecker: TypeChecker, symbol: ts.Symbol) => void;
    decorators: DecoratorDefinition<ConstructorParameterDefinition>[];
}

applyMixins(ConstructorParameterDefinition, [DecoratableDefinition]);
