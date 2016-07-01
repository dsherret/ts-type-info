import * as assert from "assert";
import {OptionalDefinition} from "./../../../../definitions";
import {OptionalTestStructure} from "./../../testStructures";

export function runOptionalDefinitionTests(definition: OptionalDefinition, structure: OptionalTestStructure) {
    it(`should be ${structure.isOptional ? "optional" : "not optional"}`, () => {
        assert.equal(definition.isOptional, structure.isOptional || false);
    });
}
