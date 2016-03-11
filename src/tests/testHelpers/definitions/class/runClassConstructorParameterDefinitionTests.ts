import * as assert from "assert";
import {ClassConstructorParameterTestStructure} from "./../../testStructures";
import {ClassConstructorParameterDefinition, ClassConstructorParameterScope} from "./../../../../definitions";
import {runBaseParameterDefinitionTests} from "./../base";
import {ensureNotNull} from "./../../ensureNotNull";

export function runClassConstructorParameterDefinitionTests(definition: ClassConstructorParameterDefinition, structure: ClassConstructorParameterTestStructure) {
    describe(`parameter ${structure.name}`, () => {
        ensureNotNull(definition, () => {
            structure.scope = structure.scope || ClassConstructorParameterScope.None;
            runBaseParameterDefinitionTests(definition, structure);

            it(`should have a scope of ${structure.scope}`, () => {
                assert.equal(definition.scope, structure.scope);
            });
        });
    });
}
