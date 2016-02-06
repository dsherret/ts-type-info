import {InterfacePropertyDefinition} from "./../../../../definitions";
import {InterfacePropertyStructure} from "./../../structures";
import {runBasePropertyDefinitionTests} from "./../base";

export function runInterfacePropertyDefinitionTests(definition: InterfacePropertyDefinition, structure: InterfacePropertyStructure) {
    describe(`property ${structure.name}`, () => {
        runBasePropertyDefinitionTests(definition, structure);
    });
}
