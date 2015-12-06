import * as ts from "typescript";
import {Scope} from "./../../scope";
import {DecoratorDefinition} from "./../../definitions";
import {applyMixins, TypeChecker} from "./../../utils";
import {BasePropertyDefinition} from "./base-property-definition";
import {IDecoratedDefinition, DecoratedDefinition} from "./decorated-definition";
import {IScopedDefinition, ScopedDefinition} from "./scoped-definition";

export class BaseClassPropertyDefinition extends BasePropertyDefinition implements IDecoratedDefinition, IScopedDefinition {
    constructor(typeChecker: TypeChecker, symbol: ts.Symbol) {
        super(typeChecker, symbol);

        this.fillDecorators(symbol);
        this.fillScope(symbol);
    }

    // DecoratableDefinition
    fillDecorators: (symbol: ts.Symbol) => void;
    decorators: DecoratorDefinition[];
    // ScopeDefinition
    scope: Scope;
    fillScope: (symbol: ts.Symbol) => void;
}

applyMixins(BaseClassPropertyDefinition, [DecoratedDefinition, ScopedDefinition]);
