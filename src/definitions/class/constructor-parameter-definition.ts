import * as ts from "typescript";
import {DecoratorDefinition} from "./../general";
import {IDecoratableDefinition, DecoratableDefinition} from "./../base";
import {ConstructorDefinition} from "./constructor-definition";
import {BaseParameterDefinition} from "./../function";
import {applyMixins, TypeChecker} from "./../../utils";

export class ConstructorParameterDefinition extends BaseParameterDefinition<ConstructorDefinition> implements IDecoratableDefinition {
    constructor(typeChecker: TypeChecker, symbol: ts.Symbol, parent: ConstructorDefinition) {
        super(typeChecker, symbol, parent);
        this.fillDecorators(typeChecker, symbol, this);
    }

    // DecoratableDefinition
    fillDecorators: (typeChecker: TypeChecker, symbol: ts.Symbol, parent: this) => void;
    decorators: DecoratorDefinition<this>[];
}

applyMixins(ConstructorParameterDefinition, [DecoratableDefinition]);
