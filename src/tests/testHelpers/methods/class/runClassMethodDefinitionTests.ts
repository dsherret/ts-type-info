import {ClassMethodTestStructure} from "./../../testStructures";
import {ClassMethodDefinition} from "./../../../../definitions";
import {runBaseClassMethodDefinitionTests} from "./base";
import {runAbstractableDefinitionTests} from "./../base";
import {runClassMethodParameterDefinitionTests} from "./runClassMethodParameterDefinitionTests";
import {ensureNotNull} from "./../../ensureNotNull";

export function runClassMethodDefinitionTests(definition: ClassMethodDefinition, structure: ClassMethodTestStructure) {
    describe(`method ${structure.name}`, () => {
        ensureNotNull(definition, () => {
            runAbstractableDefinitionTests(definition, structure);
            runBaseClassMethodDefinitionTests(runClassMethodParameterDefinitionTests, definition, structure);
        });
    });
}
