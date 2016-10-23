import {InterfacePropertyDefinition} from "./../../../../definitions";
import {InterfacePropertyTestStructure} from "./../../testStructures";
import {runBasePropertyDefinitionTests, runJsDocedDefinitionTests} from "./../base";
import {ensureNotNull} from "./../../ensureNotNull";

export function runInterfacePropertyDefinitionTests(definition: InterfacePropertyDefinition, structure: InterfacePropertyTestStructure) {
    describe(`property ${structure.name}`, () => {
        ensureNotNull(definition, () => {
            runBasePropertyDefinitionTests(definition, structure);
            runJsDocedDefinitionTests(definition, structure);
        });
    });
}
