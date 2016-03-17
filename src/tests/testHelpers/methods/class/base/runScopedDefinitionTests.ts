import * as assert from "assert";
import {ScopedDefinition, Scope} from "./../../../../../definitions";
import {ScopedTestStructure} from "./../../../testStructures";

export function runScopedDefinitionTests(definition: ScopedDefinition, structure: ScopedTestStructure) {
    structure.scope = structure.scope != null ? structure.scope : Scope.Public;

    it(`should have a scope ${structure.scope}`, () => {
        assert.equal(definition.scope, structure.scope);
    });
}
