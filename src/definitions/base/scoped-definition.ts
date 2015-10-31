import * as ts from "typescript";
import {Scope} from "./../../scope";
import {Serializable} from "./../../utils";

export interface IScopedDefinition {
    scope: Scope;
    fillScope(symbol: ts.Symbol): void;
}

export abstract class ScopedDefinition implements IScopedDefinition {
    private _scope: Scope;

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

    @Serializable
    get scope() {
        return this._scope;
    }
}