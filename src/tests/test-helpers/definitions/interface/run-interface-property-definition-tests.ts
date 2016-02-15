import {InterfacePropertyDefinition} from "./../../../../definitions";
import {InterfacePropertyTestStructure} from "./../../test-structures";
import {runBasePropertyDefinitionTests} from "./../base";
import {ensureNotNull} from "./../../ensure-not-null";

export function runInterfacePropertyDefinitionTests(definition: InterfacePropertyDefinition, structure: InterfacePropertyTestStructure) {
    describe(`property ${structure.name}`, () => {
        ensureNotNull(definition, () => {
            runBasePropertyDefinitionTests(definition, structure);
        });
    });
}
