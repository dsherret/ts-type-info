import * as assert from "assert";
import {BaseDefinition} from "./../../../../definitions";
import {BaseTestStructure} from "./../../testStructures";

export function runBaseDefinitionTests(definition: BaseDefinition, structure: BaseTestStructure) {
    it(`should ${structure.hasOnBeforeWrite ? "have" : "not have"} an onBeforeWrite method`, () => {
        assert.equal(typeof definition.onBeforeWrite === "function", structure.hasOnBeforeWrite || false);
    });

    it(`should ${structure.hasOnAfterWrite ? "have" : "not have"} an onAfterWrite method`, () => {
        assert.equal(typeof definition.onAfterWrite === "function", structure.hasOnAfterWrite || false);
    });
}
