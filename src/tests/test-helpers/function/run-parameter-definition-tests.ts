import {ParameterStructure} from "./../structures";
import {ParameterDefinition} from "./../../../definitions";
import {runBaseParameterDefinitionTests} from "./base";

export function runParameterDefinitionTests(definition: ParameterDefinition, structure: ParameterStructure) {
    describe(`parameter ${structure.name}`, () => {
        runBaseParameterDefinitionTests(definition, structure);
    });
}
