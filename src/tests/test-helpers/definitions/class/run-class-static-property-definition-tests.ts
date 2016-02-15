import {ClassStaticPropertyTestStructure} from "./../../test-structures";
import {ClassStaticPropertyDefinition} from "./../../../../definitions";
import {runBaseClassPropertyDefinitionTests} from "./base";
import {ensureNotNull} from "./../../ensure-not-null";

export function runClassStaticPropertyDefinitionTests(definition: ClassStaticPropertyDefinition, structure: ClassStaticPropertyTestStructure) {
    describe(`property ${structure.name}`, () => {
        ensureNotNull(definition, () => {
            runBaseClassPropertyDefinitionTests(definition, structure);
        });
    });
}
