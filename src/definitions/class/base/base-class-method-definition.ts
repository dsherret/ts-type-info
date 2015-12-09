import * as ts from "typescript";
import {Scope} from "./../../../scope";
import {applyMixins, TypeChecker} from "./../../../utils";
import {DecoratorDefinition} from "./../../../definitions";
import {BaseFunctionDefinition} from "./../../function/base/base-function-definition";
import {IDecoratedDefinition, DecoratedDefinition} from "./../../base/decorated-definition";
import {IScopedDefinition, ScopedDefinition} from "./../../base/scoped-definition";

export class BaseMethodDefinition extends BaseFunctionDefinition implements IDecoratedDefinition, IScopedDefinition {
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

applyMixins(BaseMethodDefinition, [DecoratedDefinition, ScopedDefinition]);
