import {FunctionStructure, FunctionParameterStructure} from "./../../../structures";
import {FunctionDefinitions, ParameterDefinitions} from "./../../../../../definitions";
import {runNamedDefinitionTests} from "./../../base";
import {runReturnTypedDefinitionTests} from "./run-return-typed-definition-tests";
import {runParameteredDefinitionTests} from "./run-parametered-definition-tests";

export function runBaseFunctionDefinitionTests<U extends FunctionParameterStructure>(
    runParameterDefinitionTests: (definition: ParameterDefinitions, structure: U) => void,
    definition: FunctionDefinitions,
    structure: FunctionStructure) {

    runNamedDefinitionTests(definition, structure);
    runReturnTypedDefinitionTests(definition, structure);
    runParameteredDefinitionTests(runParameterDefinitionTests, definition, structure);
}
