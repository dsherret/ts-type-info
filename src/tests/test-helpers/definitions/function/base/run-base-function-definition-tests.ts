import {FunctionStructure, ParameterStructures} from "./../../../structures";
import {BaseFunctionDefinitions, ParameterDefinitions} from "./../../../../../definitions";
import {runNamedDefinitionTests} from "./../../base";
import {runReturnTypedDefinitionTests} from "./run-return-typed-definition-tests";
import {runParameteredDefinitionTests} from "./run-parametered-definition-tests";

export function runBaseFunctionDefinitionTests(
    runParameterDefinitionTests: (definition: ParameterDefinitions, structure: ParameterStructures) => void,
    definition: BaseFunctionDefinitions,
    structure: FunctionStructure) {

    runNamedDefinitionTests(definition, structure);
    runReturnTypedDefinitionTests(definition, structure);
    runParameteredDefinitionTests(runParameterDefinitionTests, definition, structure);
}
