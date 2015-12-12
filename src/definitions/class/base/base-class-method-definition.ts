import * as ts from "typescript";
import {Scope} from "./../../../scope";
import {applyMixins, TypeChecker} from "./../../../utils";
import {DecoratorDefinition} from "./../../../definitions";
import {BaseFunctionDefinition} from "./../../function";
import {IDecoratableDefinition, DecoratableDefinition, IScopedDefinition, ScopedDefinition} from "./../../base";
import {ClassMethodParameterDefinition} from "./../class-method-parameter-definition";

export class BaseClassMethodDefinition extends BaseFunctionDefinition<ClassMethodParameterDefinition> implements IDecoratableDefinition, IScopedDefinition {
    constructor(typeChecker: TypeChecker, symbol: ts.Symbol) {
        super(ClassMethodParameterDefinition, typeChecker, symbol);

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

applyMixins(BaseClassMethodDefinition, [DecoratableDefinition, ScopedDefinition]);
