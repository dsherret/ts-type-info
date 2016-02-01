import * as ts from "typescript";
import {IScopedDefinition, ScopedDefinition} from "./scoped-definition";
import {Scope} from "./../scope";
import {applyMixins, TypeChecker} from "./../../../utils";
import {IDecoratableDefinition, DecoratableDefinition} from "./../../base";
import {ObjectPropertyDefinition, DecoratorDefinition} from "./../../general";
import {ClassDefinition} from "./../class-definition";

export class BaseClassPropertyDefinition extends ObjectPropertyDefinition<ClassDefinition> implements IDecoratableDefinition, IScopedDefinition {
    constructor(typeChecker: TypeChecker, symbol: ts.Symbol, parent: ClassDefinition) {
        super(typeChecker, symbol, parent);

        this.fillDecorators(typeChecker, symbol, this);
        this.fillScope(symbol);
    }

    // DecoratableDefinition
    decorators: DecoratorDefinition<this>[];
    fillDecorators: (typeChecker: TypeChecker, symbol: ts.Symbol, parent: this) => void;
    // ScopeDefinition
    scope: Scope;
    fillScope: (symbol: ts.Symbol) => void;
}

applyMixins(BaseClassPropertyDefinition, [DecoratableDefinition, ScopedDefinition]);
