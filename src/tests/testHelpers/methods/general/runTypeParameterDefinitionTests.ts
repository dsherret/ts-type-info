import * as assert from "assert";
import {TypeParameterTestStructure} from "./../../testStructures";
import {TypeParameterDefinition} from "./../../../../definitions";
import {runBaseDefinitionTests, runNamedDefinitionTests} from "./../base";
import {runTypeNodeDefinitionTests} from "./../expression";
import {ensureNotNull} from "./../../ensureNotNull";

export function runTypeParameterDefinitionTests(definition: TypeParameterDefinition, structure: TypeParameterTestStructure) {
    describe(`type parameter ${structure.name}`, () => {
        ensureNotNull(definition, () => {
            runBaseDefinitionTests(definition, structure);
            runNamedDefinitionTests(definition, structure);

            describe("constraint", () => {
                if (structure.constraintType == null) {
                    it("should not have a constraintType", () => {
                        assert.equal(definition.constraintType, null);
                    });
                }
                else {
                    runTypeNodeDefinitionTests(definition.constraintType, structure.constraintType);
                }
            });
        });
    });
}
