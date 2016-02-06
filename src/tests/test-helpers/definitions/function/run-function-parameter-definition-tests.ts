import {FunctionParameterStructure} from "./../../structures";
import {FunctionParameterDefinition} from "./../../../../definitions";
import {runBaseParameterDefinitionTests} from "./../base";

export function runFunctionParameterDefinitionTests(definition: FunctionParameterDefinition, structure: FunctionParameterStructure) {
    describe(`parameter ${structure.name}`, () => {
        runBaseParameterDefinitionTests(definition, structure);
    });
}
