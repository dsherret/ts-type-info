import {StaticProperty} from "./../structures";
import {StaticPropertyDefinition} from "./../../../definitions";
import {runPropertyDefinitionTests} from "./../base";

export function runStaticPropertyDefinitionTests(definition: StaticPropertyDefinition, property: StaticProperty) {
    if (definition == null) {
        throw "Definition should not be null.";
    }

    describe(`property ${property.name}`, () => {
        runPropertyDefinitionTests(definition, property);
    });
}
