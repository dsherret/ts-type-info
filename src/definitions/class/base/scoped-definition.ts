import {Scope} from "./../scope";
import {WrappedSymbolNode} from "./../../../wrappers";
import {ScopedStructure} from "./../../../structures";

export interface IScopedDefinition {
    scope: Scope;
    fillScope(symbolNode: WrappedSymbolNode | ScopedStructure): void;
}

export abstract class ScopedDefinition implements IScopedDefinition {
    scope: Scope;

    fillScope(symbolNodeOrStructure: WrappedSymbolNode | ScopedStructure) {
        if (symbolNodeOrStructure instanceof WrappedSymbolNode) {
            this.scope = symbolNodeOrStructure.getScope();
        }
        else {
            this.scope = symbolNodeOrStructure.scope;
        }
    }
}
