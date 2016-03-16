import {Scope, ScopedDefinition} from "./../../../../definitions";

export abstract class ScopedBinder {
    abstract getScope(): Scope;

    bind(def: ScopedDefinition) {
        def.scope = this.getScope();
    }
}
