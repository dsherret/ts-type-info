import {FunctionParameterTestStructure} from "./../../test-structures";
import {FunctionParameterDefinition} from "./../../../../definitions";
import {runBaseParameterDefinitionTests} from "./../base";

export function runFunctionParameterDefinitionTests(definition: FunctionParameterDefinition, structure: FunctionParameterTestStructure) {
    describe(`parameter ${structure.name}`, () => {
        runBaseParameterDefinitionTests(definition, structure);
    });
}
