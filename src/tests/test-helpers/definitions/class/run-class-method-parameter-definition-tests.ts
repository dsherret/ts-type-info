import {ClassMethodParameterStructure} from "./../../structures";
import {ClassMethodParameterDefinition} from "./../../../../definitions";
import {runBaseClassMethodParameterDefinitionTests} from "./base";
import {ensureNotNull} from "./../../ensure-not-null";

export function runClassMethodParameterDefinitionTests(definition: ClassMethodParameterDefinition, structure: ClassMethodParameterStructure) {
    describe(`parameter ${structure.name}`, () => {
        ensureNotNull(definition, () => {
            runBaseClassMethodParameterDefinitionTests(definition, structure);
        });
    });
}
