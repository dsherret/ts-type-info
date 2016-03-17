import {ClassMethodParameterTestStructure} from "./../../testStructures";
import {ClassMethodParameterDefinition} from "./../../../../definitions";
import {runBaseClassMethodParameterDefinitionTests} from "./base";
import {ensureNotNull} from "./../../ensureNotNull";

export function runClassMethodParameterDefinitionTests(definition: ClassMethodParameterDefinition, structure: ClassMethodParameterTestStructure) {
    describe(`parameter ${structure.name}`, () => {
        ensureNotNull(definition, () => {
            runBaseClassMethodParameterDefinitionTests(definition, structure);
        });
    });
}
