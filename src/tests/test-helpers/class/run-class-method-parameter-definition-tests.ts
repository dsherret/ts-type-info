import {ClassMethodParameterStructure} from "./../structures";
import {ClassMethodParameterDefinition} from "./../../../definitions";
import {runBaseParameterDefinitionTests} from "./../function";

export function runClassMethodParameterDefinitionTests(definition: ClassMethodParameterDefinition, structure: ClassMethodParameterStructure) {
    describe(`parameter ${structure.name}`, () => {
        runBaseParameterDefinitionTests(definition, structure);
    });
}
