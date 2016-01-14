import {ClassMethod} from "./../structures";
import {ClassMethodDefinition} from "./../../../definitions";
import {runBaseClassMethodDefinitionTests} from "./base";

export function runClassMethodDefinitionTests(definition: ClassMethodDefinition, structure: ClassMethod) {
    describe(`method ${structure.name}`, () => {
        runBaseClassMethodDefinitionTests(definition, structure);
    });
}
