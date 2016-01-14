import * as assert from "assert";
import {Property} from "./../structures";
import {PropertyDefinition} from "./../../../definitions";
import {runNamedDefinitionTests} from "./run-named-definition-tests";
import {runTypeExpressionedDefinitionTests} from "./run-typed-definition-tests";

export function runPropertyDefinitionTests(definition: PropertyDefinition, structure: Property) {
    describe(`property ${structure.name}`, () => {
        runNamedDefinitionTests(definition, structure);
        runTypeExpressionedDefinitionTests(definition, structure);

        it(`should be ${structure.isOptional ? "optional" : "not optional"}`, () => {
            assert.equal(definition.isOptional, typeof structure.isOptional === "boolean" ? structure.isOptional : false);
        });
    });
}
