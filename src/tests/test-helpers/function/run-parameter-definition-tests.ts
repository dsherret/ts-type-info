import {Parameter} from "./../structures";
import {ParameterDefinition} from "./../../../definitions";
import {runBaseParameterDefinitionTests} from "./base";

export function runParameterDefinitionTests(definition: ParameterDefinition, structure: Parameter) {
    describe(`parameter ${structure.name}`, () => {
        runBaseParameterDefinitionTests(definition, structure);
    });
}
