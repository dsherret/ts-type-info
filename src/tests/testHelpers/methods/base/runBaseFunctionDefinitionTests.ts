import {FunctionTestStructure, ParameterTestStructures} from "./../../testStructures";
import {BaseFunctionDefinitions, ParameterDefinitions} from "./../../../../definitions";
import {runNamedDefinitionTests} from "./runNamedDefinitionTests";
import {runReturnTypedDefinitionTests} from "./runReturnTypedDefinitionTests";
import {runParameteredDefinitionTests} from "./runParameteredDefinitionTests";

export function runBaseFunctionDefinitionTests(
    runParameterDefinitionTests: (definition: ParameterDefinitions, structure: ParameterTestStructures) => void,
    definition: BaseFunctionDefinitions,
    structure: FunctionTestStructure) {

    runNamedDefinitionTests(definition, structure);
    runReturnTypedDefinitionTests(definition, structure);
    runParameteredDefinitionTests(runParameterDefinitionTests, definition, structure);
}
