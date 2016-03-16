import * as assert from "assert";
import {AmbientableDefinition} from "./../../../../definitions";
import {AmbientableTestStructure} from "./../../testStructures";

export function runAmbientableDefinitionTests(definition: AmbientableDefinition, structure: AmbientableTestStructure) {
    it(`should ${structure.isAmbient ? "be" : "not be"} ambient`, () => {
        assert.equal(definition.isAmbient, structure.isAmbient || false);
    });

    it(`should ${structure.hasDeclareKeyword ? "have" : "not have"} the declare keyword`, () => {
        assert.equal(definition.hasDeclareKeyword, structure.hasDeclareKeyword || false);
    });
}
