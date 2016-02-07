import * as ts from "typescript";
import {IScopedDefinition, ScopedDefinition} from "./scoped-definition";
import {Scope} from "./../scope";
import {applyMixins, TypeChecker} from "./../../../utils";
import {IDecoratableDefinition, DecoratableDefinition, DefinitionType, ObjectPropertyDefinition} from "./../../base";
import {DecoratorDefinition} from "./../../general";
import {ClassDefinition} from "./../class-definition";

export class BaseClassPropertyDefinition extends ObjectPropertyDefinition<ClassDefinition> implements IDecoratableDefinition, IScopedDefinition {
    constructor(typeChecker: TypeChecker, symbol: ts.Symbol, parent: ClassDefinition, definitionType: DefinitionType) {
        super(typeChecker, symbol, parent, definitionType);

        this.fillDecorators(typeChecker, symbol);
        this.fillScope(symbol);
    }

    // DecoratableDefinition
    decorators: DecoratorDefinition<this>[];
    fillDecorators: (typeChecker: TypeChecker, symbol: ts.Symbol) => void;
    // ScopeDefinition
    scope: Scope;
    fillScope: (symbol: ts.Symbol) => void;
}

applyMixins(BaseClassPropertyDefinition, [DecoratableDefinition, ScopedDefinition]);
