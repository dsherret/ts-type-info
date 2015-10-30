import * as ts from "typescript";
import {Scope} from "./../../scope";

export interface IScopeDefinition {
    scope: Scope;
    initializeScopeDefinition(symbol: ts.Symbol): void;
}

export class ScopeDefinition {
    private _scope: Scope;

    get scope() {
        return this._scope;
    }

    initializeScopeDefinition(symbol: ts.Symbol) {
        if ((symbol.valueDeclaration.flags & ts.NodeFlags.Private) != 0) {
            this._scope = Scope.private;
        }
        else if ((symbol.valueDeclaration.flags & ts.NodeFlags.Protected) != 0) {
            this._scope = Scope.protected;
        }
        else {
            this._scope = Scope.public;
        }
    }
}