import {InterfacePropertyDefinition} from "./../../../../definitions";
import {InterfacePropertyTestStructure} from "./../../testStructures";
import {runBasePropertyDefinitionTests} from "./../base";
import {ensureNotNull} from "./../../EnsureNotNull";

export function runInterfacePropertyDefinitionTests(definition: InterfacePropertyDefinition, structure: InterfacePropertyTestStructure) {
    describe(`property ${structure.name}`, () => {
        ensureNotNull(definition, () => {
            runBasePropertyDefinitionTests(definition, structure);
        });
    });
}
