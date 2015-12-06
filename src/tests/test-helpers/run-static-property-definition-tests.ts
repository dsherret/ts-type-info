import {ClassProperty} from "./structures";
import {StaticPropertyDefinition} from "./../../definitions/static-property-definition";
import {runBasePropertyDefinitionTests} from "./run-base-property-definition-tests";
import {runScopedDefinitionTests} from "./run-scoped-definition-tests";

export function runStaticPropertyDefinitionTests(definition: StaticPropertyDefinition, property: ClassProperty) {
    if (definition == null) {
        throw "Definition should not be null.";
    }

    describe(`property ${property.name}`, () => {
        runBasePropertyDefinitionTests(definition, property);
        runScopedDefinitionTests(definition, property.scope);
    });
}
