import * as assert from "assert";
import {ConstructorStructure} from "./../../structures";
import {ConstructorDefinition} from "./../../../../definitions";
import {runParameteredDefinitionTests} from "./../function";
import {runConstructorParameterDefinitionTests} from "./run-constructor-parameter-definition-tests";

export function runConstructorDefinitionTests(definition: ConstructorDefinition, structure: ConstructorStructure) {
    if (structure == null) {
        it("should not have a constructor", () => {
            assert.equal(definition, null);
        });
    }
    else {
        it("should have a constructor", () => {
            assert.notEqual(definition, null);
        });

        runParameteredDefinitionTests(runConstructorParameterDefinitionTests, definition, structure);
    }
}
