import {ClassStaticMethodParameterTestStructure} from "./../../test-structures";
import {ClassStaticMethodParameterDefinition} from "./../../../../definitions";
import {runBaseClassMethodParameterDefinitionTests} from "./base";
import {ensureNotNull} from "./../../ensure-not-null";

export function runClassStaticMethodParameterDefinitionTests(definition: ClassStaticMethodParameterDefinition, structure: ClassStaticMethodParameterTestStructure) {
    describe(`parameter ${structure.name}`, () => {
        ensureNotNull(definition, () => {
            runBaseClassMethodParameterDefinitionTests(definition, structure);
        });
    });
}
