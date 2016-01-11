import {Parameter} from "./../structures";
import {ParameterDefinition} from "./../../../definitions";
import {runBaseParameterDefinitionTests} from "./base";

export function runParameterDefinitionTests(definition: ParameterDefinition, param: Parameter) {
    if (definition == null) {
        throw "Parameter definition should not be null.";
    }

    describe(`parameter ${param.name}`, () => {
        runBaseParameterDefinitionTests(definition, param);
    });
}
