import {FunctionTestStructure, ParameterTestStructures} from "./../../test-structures";
import {BaseFunctionDefinitions, ParameterDefinitions} from "./../../../../definitions";
import {runNamedDefinitionTests} from "./run-named-definition-tests";
import {runReturnTypedDefinitionTests} from "./run-return-typed-definition-tests";
import {runParameteredDefinitionTests} from "./run-parametered-definition-tests";
import {runParentedDefinitionTests} from "./run-parented-definition-tests";

export function runBaseFunctionDefinitionTests(
    runParameterDefinitionTests: (definition: ParameterDefinitions, structure: ParameterTestStructures) => void,
    definition: BaseFunctionDefinitions,
    structure: FunctionTestStructure) {

    runNamedDefinitionTests(definition, structure);
    runReturnTypedDefinitionTests(definition, structure);
    runParameteredDefinitionTests(runParameterDefinitionTests, definition, structure);
    runParentedDefinitionTests(definition);
}
