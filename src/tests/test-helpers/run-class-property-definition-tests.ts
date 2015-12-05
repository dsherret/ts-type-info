import * as assert from "assert";
import {ClassProperty} from "./structures";
import {ClassPropertyDefinition} from "./../../definitions/class-property-definition";
import {runPropertyDefinitionTests} from "./run-property-definition-tests";
import {runScopedDefinitionTests} from "./run-scoped-definition-tests";

export function runClassPropertyDefinitionTests(definition: ClassPropertyDefinition, property: ClassProperty) {
    if (definition == null) {
        throw "Definition should not be null.";
    }

    describe(`property ${property.name}`, () => {
        runPropertyDefinitionTests(definition, property);
        runScopedDefinitionTests(definition, property.scope);
    });
}
