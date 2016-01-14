import {ClassStaticPropertyStructure} from "./../../structures";
import {ClassStaticPropertyDefinition} from "./../../../../definitions";
import {runBaseClassPropertyDefinitionTests} from "./base";

export function runClassStaticPropertyDefinitionTests(definition: ClassStaticPropertyDefinition, structure: ClassStaticPropertyStructure) {
    describe(`property ${structure.name}`, () => {
        runBaseClassPropertyDefinitionTests(definition, structure);
    });
}
