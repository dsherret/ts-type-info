import {ClassMethodStructures, ClassMethodParameterStructures} from "./../../../structures";
import {ClassMethodDefinitions, ClassMethodParameterDefinitions} from "./../../../../../definitions";
import {runBaseFunctionDefinitionTests} from "./../../base";
import {runScopedDefinitionTests} from "./run-scoped-definition-tests";

export function runBaseClassMethodDefinitionTests(
    runParameterDefinitionTests: (definition: ClassMethodParameterDefinitions, structure: ClassMethodParameterStructures) => void,
    definition: ClassMethodDefinitions,
    structure: ClassMethodStructures) {

    runBaseFunctionDefinitionTests(runParameterDefinitionTests, definition, structure);
    runScopedDefinitionTests(definition, structure);
}
