import {InterfacePropertyDefinition} from "./../../../../definitions";
import {InterfacePropertyTestStructure} from "./../../testStructures";
import {runBasePropertyDefinitionTests, runDocumentationedDefinitionTests} from "./../base";
import {ensureNotNull} from "./../../ensureNotNull";

export function runInterfacePropertyDefinitionTests(definition: InterfacePropertyDefinition, structure: InterfacePropertyTestStructure) {
    describe(`property ${structure.name}`, () => {
        ensureNotNull(definition, () => {
            runBasePropertyDefinitionTests(definition, structure);
            runDocumentationedDefinitionTests(definition, structure);
        });
    });
}
