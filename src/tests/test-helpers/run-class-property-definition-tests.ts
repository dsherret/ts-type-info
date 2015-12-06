import * as assert from "assert";
import {ClassProperty} from "./structures";
import {ClassPropertyDefinition} from "./../../definitions/class-property-definition";
import {runBasePropertyDefinitionTests} from "./run-base-property-definition-tests";
import {runScopedDefinitionTests} from "./run-scoped-definition-tests";

export function runClassPropertyDefinitionTests(definition: ClassPropertyDefinition, property: ClassProperty) {
    if (definition == null) {
        throw "Definition should not be null.";
    }

    describe(`property ${property.name}`, () => {
        runBasePropertyDefinitionTests(definition, property);
        runScopedDefinitionTests(definition, property.scope);

        it(`should be ${property.isAccessor ? "an accessor" : "not an accessor"}`, () => {
            assert.equal(definition.isAccessor, property.isAccessor || false);
        });

        it(`should be ${property.isReadonly ? "readonly" : "not readonly"}`, () => {
            assert.equal(definition.isReadonly, property.isReadonly || false);
        });
    });
}
