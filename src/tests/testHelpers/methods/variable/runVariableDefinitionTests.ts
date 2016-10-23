import * as assert from "assert";
import {VariableTestStructure} from "./../../testStructures";
import {VariableDefinition, VariableDeclarationType} from "./../../../../definitions";
import {runBaseDefinitionTests, runNamedDefinitionTests, runExportableDefinitionTests, runTypedDefinitionTests, runDefaultExpressionedDefinitionTests,
    runAmbientableDefinitionTests, runOrderableDefinitionTests, runJsDocedDefinitionTests} from "./../base";
import {ensureNotNull} from "./../../ensureNotNull";

export function runVariableDefinitionTests(definition: VariableDefinition, structure: VariableTestStructure) {
    describe(`variable ${structure.name}`, () => {
        ensureNotNull(definition, () => {
            if (structure.type == null) {
                structure.type = { text: "any" };
            }
            structure.declarationType = structure.declarationType || VariableDeclarationType.Let;

            runBaseDefinitionTests(definition, structure);
            runNamedDefinitionTests(definition, structure);
            runExportableDefinitionTests(definition, structure);
            runTypedDefinitionTests(definition, structure);
            runAmbientableDefinitionTests(definition, structure);
            runDefaultExpressionedDefinitionTests(definition, structure);
            runOrderableDefinitionTests(definition, structure);
            runJsDocedDefinitionTests(definition, structure);

            it(`should have declaration type ${structure.declarationType}`, () => {
                assert.equal(definition.declarationType, structure.declarationType);
            });
        });
    });
}
