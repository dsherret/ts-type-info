import {TypePropertyTestStructure} from "./../../test-structures";
import {TypePropertyDefinition} from "./../../../../definitions";
import {runBasePropertyDefinitionTests} from "./../base";

export function runTypePropertyDefinitionTests(definition: TypePropertyDefinition, structure: TypePropertyTestStructure) {
    describe(`property ${structure.name}`, () => {
        runBasePropertyDefinitionTests(definition, structure);
    });
}
