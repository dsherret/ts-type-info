import {ClassMethodStructure} from "./../structures";
import {ClassMethodDefinition} from "./../../../definitions";
import {runBaseClassMethodDefinitionTests} from "./base";

export function runClassMethodDefinitionTests(definition: ClassMethodDefinition, structure: ClassMethodStructure) {
    describe(`method ${structure.name}`, () => {
        runBaseClassMethodDefinitionTests(definition, structure);
    });
}
