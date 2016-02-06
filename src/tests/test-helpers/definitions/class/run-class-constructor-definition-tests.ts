import * as assert from "assert";
import {ClassConstructorStructure} from "./../../structures";
import {ClassConstructorDefinition} from "./../../../../definitions";
import {runParameteredDefinitionTests} from "./../base";
import {runClassConstructorParameterDefinitionTests} from "./run-class-constructor-parameter-definition-tests";

export function runClassConstructorDefinitionTests(definition: ClassConstructorDefinition, structure: ClassConstructorStructure) {
    if (structure == null) {
        it("should not have a constructor", () => {
            assert.equal(definition, null);
        });
    }
    else {
        it("should have a constructor", () => {
            assert.notEqual(definition, null);
        });

        runParameteredDefinitionTests(runClassConstructorParameterDefinitionTests, definition, structure);
    }
}
