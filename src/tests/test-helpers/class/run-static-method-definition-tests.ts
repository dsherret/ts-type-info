import {StaticMethod} from "./../structures";
import {StaticMethodDefinition} from "./../../../definitions";
import {runBaseClassMethodDefinitionTests} from "./base";

export function runStaticMethodDefinitionTests(definition: StaticMethodDefinition, structure: StaticMethod) {
    describe(`static method ${structure.name}`, () => {
        runBaseClassMethodDefinitionTests(definition, structure);
    });
}
