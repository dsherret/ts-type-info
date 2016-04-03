import * as assert from "assert";
import {VariableTestStructure} from "./../../testStructures";
import {VariableDefinition} from "./../../../../definitions";
import {runNamedDefinitionTests, runExportableDefinitionTests, runTypeExpressionedDefinitionTests,
        runDefaultExpressionedDefinitionTests, runAmbientableDefinitionTests} from "./../base";
import {ensureNotNull} from "./../../ensureNotNull";

export function runVariableDefinitionTests(definition: VariableDefinition, structure: VariableTestStructure) {
    describe(`variable ${structure.name}`, () => {
        ensureNotNull(definition, () => {
            if (structure.typeExpression == null) {
                structure.typeExpression = { text: "any" };
            }

            runNamedDefinitionTests(definition, structure);
            runExportableDefinitionTests(definition, structure);
            runTypeExpressionedDefinitionTests(definition, structure);
            runAmbientableDefinitionTests(definition, structure);
            runDefaultExpressionedDefinitionTests(definition, structure);

            it(`should have declaration type ${structure.declarationType}`, () => {
                assert.equal(definition.declarationType, structure.declarationType);
            });
        });
    });
}
