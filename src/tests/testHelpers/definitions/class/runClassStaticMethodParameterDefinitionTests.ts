import {ClassStaticMethodParameterTestStructure} from "./../../testStructures";
import {ClassStaticMethodParameterDefinition} from "./../../../../definitions";
import {runBaseClassMethodParameterDefinitionTests} from "./base";
import {ensureNotNull} from "./../../EnsureNotNull";

export function runClassStaticMethodParameterDefinitionTests(definition: ClassStaticMethodParameterDefinition, structure: ClassStaticMethodParameterTestStructure) {
    describe(`parameter ${structure.name}`, () => {
        ensureNotNull(definition, () => {
            runBaseClassMethodParameterDefinitionTests(definition, structure);
        });
    });
}
