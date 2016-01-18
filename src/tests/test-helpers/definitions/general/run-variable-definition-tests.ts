import {VariableStructure} from "./../../structures";
import {VariableDefinition} from "./../../../../definitions";
import {runNamedDefinitionTests, runExportableDefinitionTests, runTypeExpressionedDefinitionTests,
        runDefaultExpressionedDefinitionTests, ensureDefinitionNotNull} from "./../base";

export function runVariableDefinitionTests(definition: VariableDefinition, structure: VariableStructure) {
    describe(`variable ${structure.name}`, () => {
        ensureDefinitionNotNull(definition, () => {
            runNamedDefinitionTests(definition, structure);
            runExportableDefinitionTests(definition, structure);
            runTypeExpressionedDefinitionTests(definition, structure);
            runDefaultExpressionedDefinitionTests(definition, structure);
        });
    });
}
