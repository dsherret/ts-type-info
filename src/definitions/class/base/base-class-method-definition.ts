import * as ts from "typescript";
import {Scope} from "./../scope";
import {applyMixins, TypeChecker} from "./../../../utils";
import {DecoratorDefinition} from "./../../../definitions";
import {BaseFunctionDefinition} from "./../../function";
import {IDecoratableDefinition, DecoratableDefinition} from "./../../base";
import {IScopedDefinition, ScopedDefinition} from "./scoped-definition";
import {ClassMethodParameterDefinition} from "./../class-method-parameter-definition";

export class BaseClassMethodDefinition extends BaseFunctionDefinition<ClassMethodParameterDefinition> implements IDecoratableDefinition, IScopedDefinition {
    constructor(typeChecker: TypeChecker, symbol: ts.Symbol) {
        super(ClassMethodParameterDefinition, typeChecker, symbol);

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

applyMixins(BaseClassMethodDefinition, [DecoratableDefinition, ScopedDefinition]);
