import * as assert from "assert";
import {IScopedDefinition} from "./../../../../definitions";
import {Scope} from "./../../../../scope";
import {ScopedStructure} from "./../../structures";

export function runScopedDefinitionTests(definition: IScopedDefinition, structure: ScopedStructure) {
    structure.scope = typeof structure.scope === "number" ? structure.scope : Scope.public;

    it(`should have a scope ${Scope[structure.scope]}`, () => {
        assert.equal(definition.scope, structure.scope);
    });
}
