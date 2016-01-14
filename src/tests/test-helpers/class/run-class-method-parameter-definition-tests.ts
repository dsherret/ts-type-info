import {ClassMethodParameter} from "./../structures";
import {ClassMethodParameterDefinition} from "./../../../definitions";
import {runBaseParameterDefinitionTests} from "./../function";

export function runClassMethodParameterDefinitionTests(definition: ClassMethodParameterDefinition, structure: ClassMethodParameter) {
    describe(`parameter ${structure.name}`, () => {
        runBaseParameterDefinitionTests(definition, structure);
    });
}
