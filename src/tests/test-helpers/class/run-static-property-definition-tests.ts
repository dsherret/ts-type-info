import {StaticPropertyStructure} from "./../structures";
import {StaticPropertyDefinition} from "./../../../definitions";
import {runBaseClassPropertyDefinitionTests} from "./base";

export function runStaticPropertyDefinitionTests(definition: StaticPropertyDefinition, structure: StaticPropertyStructure) {
    describe(`property ${structure.name}`, () => {
        runBaseClassPropertyDefinitionTests(definition, structure);
    });
}
