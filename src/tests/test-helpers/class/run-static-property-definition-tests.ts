import {StaticProperty} from "./../structures";
import {StaticPropertyDefinition} from "./../../../definitions";
import {runBasePropertyDefinitionTests} from "./../base";

export function runStaticPropertyDefinitionTests(definition: StaticPropertyDefinition, property: StaticProperty) {
    if (definition == null) {
        throw "Definition should not be null.";
    }

    describe(`property ${property.name}`, () => {
        runBasePropertyDefinitionTests(definition, property);
    });
}
