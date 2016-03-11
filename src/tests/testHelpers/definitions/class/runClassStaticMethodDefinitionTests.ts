import {ClassStaticMethodTestStructure} from "./../../testStructures";
import {ClassStaticMethodDefinition} from "./../../../../definitions";
import {runBaseClassMethodDefinitionTests} from "./base";
import {runClassStaticMethodParameterDefinitionTests} from "./runClassStaticMethodParameterDefinitionTests";
import {ensureNotNull} from "./../../ensureNotNull";

export function runClassStaticMethodDefinitionTests(definition: ClassStaticMethodDefinition, structure: ClassStaticMethodTestStructure) {
    describe(`static method ${structure.name}`, () => {
        ensureNotNull(definition, () => {
            runBaseClassMethodDefinitionTests(runClassStaticMethodParameterDefinitionTests, definition, structure);
        });
    });
}
