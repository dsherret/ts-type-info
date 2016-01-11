import * as ts from "typescript";
import {Scope} from "./../../../scope";
import {applyMixins, TypeChecker} from "./../../../utils";
import {DecoratorDefinition} from "./../../misc";
import {PropertyDefinition, IScopedDefinition, ScopedDefinition, IDecoratableDefinition, DecoratableDefinition} from "./../../base";

export class BaseClassPropertyDefinition extends PropertyDefinition implements IDecoratableDefinition, IScopedDefinition {
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
