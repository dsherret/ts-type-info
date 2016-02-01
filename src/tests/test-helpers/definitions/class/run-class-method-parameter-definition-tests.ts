import {ClassMethodParameterStructure} from "./../../structures";
import {ClassMethodParameterDefinition} from "./../../../../definitions";
import {runBaseClassMethodParameterDefinitionTests} from "./base";

export function runClassMethodParameterDefinitionTests(definition: ClassMethodParameterDefinition, structure: ClassMethodParameterStructure) {
    describe(`parameter ${structure.name}`, () => {
        runBaseClassMethodParameterDefinitionTests(definition, structure);
    });
}
