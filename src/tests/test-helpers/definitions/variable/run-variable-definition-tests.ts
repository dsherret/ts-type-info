import * as assert from "assert";
import {VariableStructure} from "./../../structures";
import {VariableDefinition, VariableDeclarationType} from "./../../../../definitions";
import {runNamedDefinitionTests, runExportableDefinitionTests, runTypeExpressionedDefinitionTests,
        runDefaultExpressionedDefinitionTests, ensureDefinitionNotNull} from "./../base";

export function runVariableDefinitionTests(definition: VariableDefinition, structure: VariableStructure) {
    describe(`variable ${structure.name}`, () => {
        ensureDefinitionNotNull(definition, () => {
            runNamedDefinitionTests(definition, structure);
            runExportableDefinitionTests(definition, structure);
            runTypeExpressionedDefinitionTests(definition, structure);
            runDefaultExpressionedDefinitionTests(definition, structure);
            runDeclarationTypeTests(definition, structure);
        });
    });
}

function runDeclarationTypeTests(definition: VariableDefinition, structure: VariableStructure) {
    it(`should have declaration type ${VariableDeclarationType[structure.declarationType]}`, () => {
        assert.equal(definition.declarationType, structure.declarationType);
    });
}
