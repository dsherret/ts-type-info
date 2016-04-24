import {ClassMethodTestStructures, ClassMethodParameterTestStructures} from "./../../../testStructures";
import {ClassMethodDefinitions, ClassMethodParameterDefinitions} from "./../../../../../definitions";
import {runBaseFunctionDefinitionTests, runFunctionBodyWriteableDefinitionTests, runAsyncableDefinitionTests} from "./../../base";
import {runScopedDefinitionTests} from "./runScopedDefinitionTests";

export function runBaseClassMethodDefinitionTests(
    runParameterDefinitionTests: (definition: ClassMethodParameterDefinitions, structure: ClassMethodParameterTestStructures) => void,
    definition: ClassMethodDefinitions,
    structure: ClassMethodTestStructures
) {
    runBaseFunctionDefinitionTests(runParameterDefinitionTests, definition, structure);
    runAsyncableDefinitionTests(definition, structure);
    runScopedDefinitionTests(definition, structure);
    runFunctionBodyWriteableDefinitionTests(definition, structure);
}
