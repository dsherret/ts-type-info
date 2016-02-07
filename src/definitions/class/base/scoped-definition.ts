import * as ts from "typescript";
import {Scope} from "./../scope";

export interface IScopedDefinition {
    scope: Scope;
    fillScope(symbol: ts.Symbol): void;
}

export abstract class ScopedDefinition implements IScopedDefinition {
    scope: Scope;

    fillScope(symbol: ts.Symbol) {
        if ((symbol.valueDeclaration.flags & ts.NodeFlags.Private) !== 0) {
            this.scope = Scope.Private;
        }
        else if ((symbol.valueDeclaration.flags & ts.NodeFlags.Protected) !== 0) {
            this.scope = Scope.Protected;
        }
        else {
            this.scope = Scope.Public;
        }
    }
}
