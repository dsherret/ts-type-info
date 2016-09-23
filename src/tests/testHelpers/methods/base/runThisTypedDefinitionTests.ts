import * as assert from "assert";
import {ThisTypedTestStructure} from "./../../testStructures";
import {ThisTypedDefinition} from "./../../../../definitions";
import {runTypeNodeDefinitionTests} from "./../expression";

export function runThisTypedDefinitionTests(definition: ThisTypedDefinition, structure: ThisTypedTestStructure) {
    describe("thisType", () => {
        if (structure.thisType == null) {
            it("should be null", () => {
                assert.equal(definition.thisType, null);
            });
        }
        else {
            runTypeNodeDefinitionTests(definition.thisType, structure.thisType);
        }
    });
}
