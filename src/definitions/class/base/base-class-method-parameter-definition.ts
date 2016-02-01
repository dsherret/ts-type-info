import * as ts from "typescript";
import {DecoratorDefinition} from "./../../general";
import {IDecoratableDefinition, DecoratableDefinition} from "./../../base";
import {BaseParameterDefinition} from "./../../function";
import {applyMixins, TypeChecker} from "./../../../utils";

export class BaseClassMethodParameterDefinition<ParentType> extends BaseParameterDefinition<ParentType> implements IDecoratableDefinition {
    constructor(typeChecker: TypeChecker, symbol: ts.Symbol, parent: ParentType) {
        super(typeChecker, symbol, parent);
        this.fillDecorators(typeChecker, symbol, this);
    }

    // DecoratableDefinition
    decorators: DecoratorDefinition<this>[];
    fillDecorators: (typeChecker: TypeChecker, symbol: ts.Symbol, parent: this) => void;
}

applyMixins(BaseClassMethodParameterDefinition, [DecoratableDefinition]);
