import {ClassProperty} from "./structures";
import {ClassPropertyDefinition} from "./../../definitions/class-property-definition";
import {runBasePropertyDefinitionTests} from "./run-base-property-definition-tests";
import {runScopedDefinitionTests} from "./run-scoped-definition-tests";

export function runStaticPropertyDefinitionTests(definition: ClassPropertyDefinition, property: ClassProperty) {
    if (definition == null) {
        throw "Definition should not be null.";
    }

    describe(`property ${property.name}`, () => {
        runBasePropertyDefinitionTests(definition, property);
        runScopedDefinitionTests(definition, property.scope);
    });
}
