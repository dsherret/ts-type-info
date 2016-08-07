import * as assert from "assert";
import {ReadonlyableDefinition} from "./../../../../definitions";
import {ReadonlyableTestStructure} from "./../../testStructures";

export function runReadonlyableDefinitionTests(definition: ReadonlyableDefinition, structure: ReadonlyableTestStructure) {
    it(`should ${structure.isReadonly ? "be" : "not be"} readonly`, () => {
        assert.equal(definition.isReadonly, structure.isReadonly || false);
    });
}
