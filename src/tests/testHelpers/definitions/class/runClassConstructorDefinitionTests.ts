import * as assert from "assert";
import {ClassConstructorTestStructure} from "./../../testStructures";
import {ClassConstructorDefinition} from "./../../../../definitions";
import {runParameteredDefinitionTests, runParentedDefinitionTests} from "./../base";
import {runClassConstructorParameterDefinitionTests} from "./runClassConstructorParameterDefinitionTests";
import {ensureNotNull} from "./../../EnsureNotNull";

export function runClassConstructorDefinitionTests(definition: ClassConstructorDefinition, structure: ClassConstructorTestStructure) {
    if (structure == null) {
        it("should not have a constructor", () => {
            assert.equal(definition, null);
        });
    }
    else {
        ensureNotNull(definition, () => {
            runParameteredDefinitionTests(runClassConstructorParameterDefinitionTests, definition, structure);
            runParentedDefinitionTests(definition);
        });
    }
}
