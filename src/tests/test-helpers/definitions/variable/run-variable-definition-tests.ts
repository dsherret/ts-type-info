import * as assert from "assert";
import {VariableStructure} from "./../../structures";
import {VariableDefinition} from "./../../../../definitions";
import {runNamedDefinitionTests, runExportableDefinitionTests, runTypeExpressionedDefinitionTests,
        runDefaultExpressionedDefinitionTests, runAmbientableDefinitionTests, runParentedDefinitionTests} from "./../base";
import {ensureNotNull} from "./../../ensure-not-null";

export function runVariableDefinitionTests(definition: VariableDefinition, structure: VariableStructure) {
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
            runParentedDefinitionTests(definition);

            it(`should have declaration type ${structure.declarationType}`, () => {
                assert.equal(definition.declarationType, structure.declarationType);
            });
        });
    });
}
