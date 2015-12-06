import {Property} from "./structures";
import {BasePropertyDefinition} from "./../../definitions/base/base-property-definition";
import {runNamedDefinitionTests} from "./run-named-definition-tests";
import {runTypedDefinitionTests} from "./run-typed-definition-tests";

export function runBasePropertyDefinitionTests(definition: BasePropertyDefinition, property: Property) {
    if (definition == null) {
        throw "Definition should not be null.";
    }

    describe(`property ${property.name}`, () => {
        runNamedDefinitionTests(definition, property.name);
        runTypedDefinitionTests(definition, property.type);
    });
}
