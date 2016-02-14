import {InterfacePropertyDefinition} from "./../../../../definitions";
import {InterfacePropertyStructure} from "./../../structures";
import {runBasePropertyDefinitionTests} from "./../base";
import {ensureNotNull} from "./../../ensure-not-null";

export function runInterfacePropertyDefinitionTests(definition: InterfacePropertyDefinition, structure: InterfacePropertyStructure) {
    describe(`property ${structure.name}`, () => {
        ensureNotNull(definition, () => {
            runBasePropertyDefinitionTests(definition, structure);
        });
    });
}
