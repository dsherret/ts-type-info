import * as assert from "assert";
import {ClassConstructorTestStructure} from "./../../testStructures";
import {ClassConstructorDefinition} from "./../../../../definitions";
import {runBaseDefinitionTests, runParameteredDefinitionTests, runFunctionBodyWriteableDefinitionTests, runOverloadSignaturedDefinitionTests,
    runJsDocedDefinitionTests} from "./../base";
import {runScopedDefinitionTests} from "./base";
import {runClassConstructorParameterDefinitionTests} from "./runClassConstructorParameterDefinitionTests";
import {ensureNotNull} from "./../../ensureNotNull";

export function runClassConstructorDefinitionTests(definition: ClassConstructorDefinition | null, structure: ClassConstructorTestStructure | undefined) {
    if (structure == null) {
        it("should not have a constructor", () => {
            assert.equal(definition, null);
        });
    }
    else {
        ensureNotNull(definition, () => {
            runBaseDefinitionTests(definition!, structure!);
            runParameteredDefinitionTests(runClassConstructorParameterDefinitionTests, definition!, structure!);
            runFunctionBodyWriteableDefinitionTests(definition!, structure!);
            runScopedDefinitionTests(definition!, structure!);
            runOverloadSignaturedDefinitionTests(definition!, structure!);
            runJsDocedDefinitionTests(definition!, structure);
        });
    }
}
