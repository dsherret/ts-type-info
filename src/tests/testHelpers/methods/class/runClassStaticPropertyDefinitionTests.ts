import {ClassStaticPropertyTestStructure} from "./../../testStructures";
import {ClassStaticPropertyDefinition} from "./../../../../definitions";
import {runBaseClassPropertyDefinitionTests} from "./base";
import {ensureNotNull} from "./../../ensureNotNull";

export function runClassStaticPropertyDefinitionTests(definition: ClassStaticPropertyDefinition, structure: ClassStaticPropertyTestStructure) {
    describe(`property ${structure.name}`, () => {
        ensureNotNull(definition, () => {
            runBaseClassPropertyDefinitionTests(definition, structure);
        });
    });
}
