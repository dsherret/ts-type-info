import * as ts from "typescript";
import {IScopedDefinition, ScopedDefinition} from "./scoped-definition";
import {Scope} from "./../scope";
import {applyMixins, TypeChecker} from "./../../../utils";
import {IDecoratableDefinition, DecoratableDefinition} from "./../../base";
import {ObjectPropertyDefinition, DecoratorDefinition} from "./../../general";
import {ClassDefinition} from "./../class-definition";

export class BaseClassPropertyDefinition<ThisType extends BaseClassPropertyDefinition<ThisType>>
    extends ObjectPropertyDefinition<ClassDefinition>
    implements IDecoratableDefinition<ThisType>, IScopedDefinition {

    constructor(typeChecker: TypeChecker, symbol: ts.Symbol) {
        super(typeChecker, symbol);

        this.fillDecorators(typeChecker, symbol);
        this.fillScope(symbol);
    }

    // DecoratableDefinition
    fillDecorators: (typeChecker: TypeChecker, symbol: ts.Symbol) => void;
    decorators: DecoratorDefinition<ThisType>[];
    // ScopeDefinition
    scope: Scope;
    fillScope: (symbol: ts.Symbol) => void;
}

applyMixins(BaseClassPropertyDefinition, [DecoratableDefinition, ScopedDefinition]);
