import * as ts from "typescript";
import {IScopedDefinition, ScopedDefinition} from "./scoped-definition";
import {Scope} from "./../scope";
import {applyMixins, TypeChecker} from "./../../../utils";
import {IDecoratableDefinition, DecoratableDefinition} from "./../../base";
import {ObjectPropertyDefinition, DecoratorDefinition} from "./../../general";

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
