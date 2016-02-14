import {Scope} from "./../scope";
import {WrappedSymbolNode} from "./../../../wrappers";

export interface IScopedDefinition {
    scope: Scope;
    fillScope(symbolNode: WrappedSymbolNode): void;
}

export abstract class ScopedDefinition implements IScopedDefinition {
    scope: Scope;

    fillScope(symbolNode: WrappedSymbolNode) {
        this.scope = symbolNode.getScope();
    }
}
