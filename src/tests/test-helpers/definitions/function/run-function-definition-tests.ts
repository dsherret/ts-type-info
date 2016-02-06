import {FunctionStructure} from "./../../structures";
import {FunctionDefinition} from "./../../../../definitions";
import {runExportableDefinitionTests, runAmbientableDefinitionTests, runBaseFunctionDefinitionTests} from "./../base";
import {ensureNotNull} from "./../../ensure-not-null";
import {runFunctionParameterDefinitionTests} from "./run-function-parameter-definition-tests";

export function runFunctionDefinitionTests(definition: FunctionDefinition, structure: FunctionStructure) {
    describe(`function ${structure.name}`, () => {
        ensureNotNull(definition, () => {
            runBaseFunctionDefinitionTests(runFunctionParameterDefinitionTests, definition, structure);
            runAmbientableDefinitionTests(definition, structure);
            runExportableDefinitionTests(definition, structure);
        });
    });
}
