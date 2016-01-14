import {FunctionStructure, ParameterStructure} from "./../../structures";
import {BaseFunctionDefinition, BaseParameterDefinition} from "./../../../../definitions";
import {runNamedDefinitionTests} from "./../../base";
import {runReturnTypedDefinitionTests} from "./run-return-typed-definition-tests";
import {runParameteredDefinitionTests} from "./run-parametered-definition-tests";

export function runBaseFunctionDefinitionTests<T extends BaseParameterDefinition, U extends ParameterStructure>(
    runParameterDefinitionTests: (definition: T, structure: U) => void,
    definition: BaseFunctionDefinition<T>,
    structure: FunctionStructure) {

    runNamedDefinitionTests(definition, structure);
    runReturnTypedDefinitionTests(definition, structure);
    runParameteredDefinitionTests(runParameterDefinitionTests, definition, structure);
}
