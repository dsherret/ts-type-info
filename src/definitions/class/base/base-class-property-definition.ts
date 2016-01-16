import * as ts from "typescript";
import {Scope} from "./../../../scope";
import {applyMixins, TypeChecker} from "./../../../utils";
import {ObjectPropertyDefinition, IScopedDefinition, ScopedDefinition, IDecoratableDefinition, DecoratableDefinition, DecoratorDefinition} from "./../../base";

export class BaseClassPropertyDefinition extends ObjectPropertyDefinition implements IDecoratableDefinition, IScopedDefinition {
    constructor(typeChecker: TypeChecker, symbol: ts.Symbol) {
        super(typeChecker, symbol);

        this.fillDecorators(typeChecker, symbol);
        this.fillScope(symbol);
    }

    // DecoratableDefinition
    fillDecorators: (typeChecker: TypeChecker, symbol: ts.Symbol) => void;
    decorators: DecoratorDefinition[];
    // ScopeDefinition
    scope: Scope;
    fillScope: (symbol: ts.Symbol) => void;
}

applyMixins(BaseClassPropertyDefinition, [DecoratableDefinition, ScopedDefinition]);
