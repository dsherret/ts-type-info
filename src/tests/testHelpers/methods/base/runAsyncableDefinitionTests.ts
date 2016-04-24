import * as assert from "assert";
import {AsyncableDefinition} from "./../../../../definitions";
import {AsyncableTestStructure} from "./../../testStructures";

export function runAsyncableDefinitionTests(definition: AsyncableDefinition, structure: AsyncableTestStructure) {
    it(`should ${structure.isAsync ? "be" : "not be"} async`, () => {
        assert.equal(definition.isAsync, structure.isAsync || false);
    });
}
