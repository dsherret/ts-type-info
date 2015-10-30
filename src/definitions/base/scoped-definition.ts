import * as ts from "typescript";
import {Scope} from "./../../scope";
import {Serializable} from "./../../utils";

export interface IScopeDefinition {
    scope: Scope;
    fillScope(symbol: ts.Symbol): void;
}

export abstract class ScopeDefinition implements IScopeDefinition {
    private _scope: Scope;

    @Serializable
    get scope() {
        return this._scope;
    }

    fillScope(symbol: ts.Symbol) {
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