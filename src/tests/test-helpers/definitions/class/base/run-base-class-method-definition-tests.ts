import {ClassMethodTestStructures, ClassMethodParameterTestStructures} from "./../../../test-structures";
import {ClassMethodDefinitions, ClassMethodParameterDefinitions} from "./../../../../../definitions";
import {runBaseFunctionDefinitionTests} from "./../../base";
import {runScopedDefinitionTests} from "./run-scoped-definition-tests";

export function runBaseClassMethodDefinitionTests(
    runParameterDefinitionTests: (definition: ClassMethodParameterDefinitions, structure: ClassMethodParameterTestStructures) => void,
    definition: ClassMethodDefinitions,
    structure: ClassMethodTestStructures) {

    runBaseFunctionDefinitionTests(runParameterDefinitionTests, definition, structure);
    runScopedDefinitionTests(definition, structure);
}
