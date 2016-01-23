import * as assert from "assert";
import {IScopedDefinition, Scope} from "./../../../../../definitions";
import {ScopedStructure} from "./../../../structures";

export function runScopedDefinitionTests(definition: IScopedDefinition, structure: ScopedStructure) {
    structure.scope = typeof structure.scope === "number" ? structure.scope : Scope.public;

    it(`should have a scope ${Scope[structure.scope]}`, () => {
        assert.equal(definition.scope, structure.scope);
    });
}
