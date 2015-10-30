import * as ts from "typescript";
import {TypedDefinition} from "./typed-definition";
import {IScopeDefinition, ScopeDefinition} from "./base/scope-definition";
import {Scope} from "./../scope";
import {TypeChecker, applyMixins} from "./../utils";

export class PropertyDefinition extends TypedDefinition implements IScopeDefinition {
    // ScopeDefinition
    scope: Scope;
    initializeScopeDefinition: (symbol: ts.Symbol) => void;

    constructor(typeChecker: TypeChecker, symbol: ts.Symbol) {
        super(typeChecker, symbol);

        this.initializeScopeDefinition(symbol);
    }

    static isProperty(symbol: ts.Symbol) {
        return (symbol.getFlags() & ts.SymbolFlags.Property) !== 0;
    }
}

applyMixins(PropertyDefinition, [ScopeDefinition]);