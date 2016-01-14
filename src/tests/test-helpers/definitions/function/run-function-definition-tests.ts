import {FunctionStructure} from "./../../structures";
import {FunctionDefinition} from "./../../../../definitions";
import {runExportableDefinitionTests, ensureDefinitionNotNull} from "./../base";
import {runBaseFunctionDefinitionTests} from "./base";
import {runParameterDefinitionTests} from "./run-parameter-definition-tests";

export function runFunctionDefinitionTests(definition: FunctionDefinition, structure: FunctionStructure) {
    describe(`function ${structure.name}`, () => {
        ensureDefinitionNotNull(definition, () => {
            runBaseFunctionDefinitionTests(runParameterDefinitionTests, definition, structure);
            runExportableDefinitionTests(definition, structure);
        });
    });
}
