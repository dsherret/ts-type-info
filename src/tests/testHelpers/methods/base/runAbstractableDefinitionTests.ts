import * as assert from "assert";
import {AbstractableDefinition} from "./../../../../definitions";
import {AbstractableTestStructure} from "./../../testStructures";

export function runAbstractableDefinitionTests(definition: AbstractableDefinition, structure: AbstractableTestStructure) {
    it(`should ${structure.isAbstract ? "be" : "not be"} abstract`, () => {
        assert.equal(definition.isAbstract, structure.isAbstract || false);
    });
}
