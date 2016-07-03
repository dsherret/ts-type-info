import {FunctionTestStructure} from "./../../testStructures";
import {FunctionDefinition} from "./../../../../definitions";
import {runAmbientableDefinitionTests, runAsyncableDefinitionTests, runExportableDefinitionTests, runBaseFunctionDefinitionTests,
    runFunctionBodyWriteableDefinitionTests, runOrderableDefinitionTests} from "./../base";
import {ensureNotNull} from "./../../ensureNotNull";
import {runFunctionParameterDefinitionTests} from "./runFunctionParameterDefinitionTests";

export function runFunctionDefinitionTests(definition: FunctionDefinition, structure: FunctionTestStructure) {
    describe(`function ${structure.name}`, () => {
        ensureNotNull(definition, () => {
            runBaseFunctionDefinitionTests(runFunctionParameterDefinitionTests, definition, structure);
            runAmbientableDefinitionTests(definition, structure);
            runAsyncableDefinitionTests(definition, structure);
            runExportableDefinitionTests(definition, structure);
            runFunctionBodyWriteableDefinitionTests(definition, structure);
            runOrderableDefinitionTests(definition, structure);
        });
    });
}
