import {TypeFunctionParameterTestStructure} from "./../../testStructures";
import {TypeFunctionParameterDefinition} from "./../../../../definitions";
import {runBaseParameterDefinitionTests} from "./../base";

export function runTypeFunctionParameterDefinitionTests(definition: TypeFunctionParameterDefinition, structure: TypeFunctionParameterTestStructure) {
    describe(`parameter ${structure.name}`, () => {
        runBaseParameterDefinitionTests(definition, structure);
    });
}
