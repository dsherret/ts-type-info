import {Property} from "./../structures";
import {PropertyDefinition} from "./../../../definitions";
import {runNamedDefinitionTests} from "./run-named-definition-tests";
import {runTypedDefinitionTests} from "./run-typed-definition-tests";

export function runPropertyDefinitionTests(definition: PropertyDefinition, property: Property) {
    if (definition == null) {
        throw "Definition should not be null.";
    }

    describe(`property ${property.name}`, () => {
        runNamedDefinitionTests(definition, property.name);
        runTypedDefinitionTests(definition, property.type);
    });
}
