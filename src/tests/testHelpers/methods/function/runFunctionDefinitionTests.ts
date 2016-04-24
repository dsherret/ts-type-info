import {FunctionTestStructure} from "./../../testStructures";
import {FunctionDefinition} from "./../../../../definitions";
import {runExportableDefinitionTests, runAmbientableDefinitionTests, runBaseFunctionDefinitionTests, runFunctionBodyWriteableDefinitionTests} from "./../base";
import {ensureNotNull} from "./../../ensureNotNull";
import {runFunctionParameterDefinitionTests} from "./runFunctionParameterDefinitionTests";

export function runFunctionDefinitionTests(definition: FunctionDefinition, structure: FunctionTestStructure) {
    describe(`function ${structure.name}`, () => {
        ensureNotNull(definition, () => {
            runBaseFunctionDefinitionTests(runFunctionParameterDefinitionTests, definition, structure);
            runAmbientableDefinitionTests(definition, structure);
            runExportableDefinitionTests(definition, structure);
            runFunctionBodyWriteableDefinitionTests(definition, structure);
        });
    });
}
