import {Scope} from "./../scope";
import {ISymbolNode} from "./../../../wrappers";

export interface IScopedDefinition {
    scope: Scope;
    fillScope(symbolNode: ISymbolNode): void;
}

export abstract class ScopedDefinition implements IScopedDefinition {
    scope: Scope;

    fillScope(symbolNode: ISymbolNode) {
        this.scope = symbolNode.getScope();
    }
}
