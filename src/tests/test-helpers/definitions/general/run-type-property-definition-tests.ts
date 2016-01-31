import {TypePropertyStructure} from "./../../structures";
import {TypePropertyDefinition} from "./../../../../definitions";
import {runBasePropertyDefinitionTests} from "./../base";

export function runTypePropertyDefinitionTests(definition: TypePropertyDefinition, structure: TypePropertyStructure) {
    describe(`property ${structure.name}`, () => {
        runBasePropertyDefinitionTests(definition, structure);
    });
}
