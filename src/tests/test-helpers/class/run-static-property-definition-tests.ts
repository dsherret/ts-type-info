import {StaticProperty} from "./../structures";
import {StaticPropertyDefinition} from "./../../../definitions";
import {runBaseClassPropertyDefinitionTests} from "./base";

export function runStaticPropertyDefinitionTests(definition: StaticPropertyDefinition, structure: StaticProperty) {
    describe(`property ${structure.name}`, () => {
        runBaseClassPropertyDefinitionTests(definition, structure);
    });
}
