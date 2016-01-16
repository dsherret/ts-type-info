import {InterfacePropertyStructure} from "./../../structures";
import {InterfacePropertyDefinition} from "./../../../../definitions";
import {runBasePropertyDefinitionTests} from "./../base";

export function runInterfacePropertyDefinitionTests(definition: InterfacePropertyDefinition, structure: InterfacePropertyStructure) {
    describe(`property ${structure.name}`, () => {
        runBasePropertyDefinitionTests(definition, structure);
    });
}
