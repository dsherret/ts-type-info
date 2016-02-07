import * as assert from "assert";
import {IScopedDefinition, Scope} from "./../../../../../definitions";
import {ScopedStructure} from "./../../../structures";

export function runScopedDefinitionTests(definition: IScopedDefinition, structure: ScopedStructure) {
    structure.scope = structure.scope != null ? structure.scope : Scope.Public;

    it(`should have a scope ${structure.scope}`, () => {
        assert.equal(definition.scope, structure.scope);
    });
}
