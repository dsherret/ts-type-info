import * as ts from "typescript";
import {Scope} from "./../scope";
import {DecoratorDefinition, PropertyDefinition} from "./../definitions";
import {applyMixins, TypeChecker} from "./../utils";
import {Type} from "./../types";
import {INamedDefinition, NamedDefinition} from "./base/named-definition";
import {IDecoratedDefinition, DecoratedDefinition} from "./base/decorated-definition";
import {IScopedDefinition, ScopedDefinition} from "./base/scoped-definition";
import {ITypedDefinition, TypedDefinition} from "./base/typed-definition";

export class ClassPropertyDefinition extends PropertyDefinition implements IDecoratedDefinition, IScopedDefinition {
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

applyMixins(ClassPropertyDefinition, [DecoratedDefinition, ScopedDefinition]);