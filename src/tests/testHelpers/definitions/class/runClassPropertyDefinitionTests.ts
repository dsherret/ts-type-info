import * as assert from "assert";
import {ClassPropertyTestStructure} from "./../../testStructures";
import {ClassPropertyDefinition} from "./../../../../definitions";
import {runBaseClassPropertyDefinitionTests} from "./base";
import {ensureNotNull} from "./../../EnsureNotNull";

export function runClassPropertyDefinitionTests(definition: ClassPropertyDefinition, structure: ClassPropertyTestStructure) {
    describe(`property ${structure.name}`, () => {
        ensureNotNull(definition, () => {
            runBaseClassPropertyDefinitionTests(definition, structure);

            it(`should be ${structure.isAccessor ? "an accessor" : "not an accessor"}`, () => {
                assert.equal(definition.isAccessor, structure.isAccessor || false);
            });

            it(`should be ${structure.isReadonly ? "readonly" : "not readonly"}`, () => {
                assert.equal(definition.isReadonly, structure.isReadonly || false);
            });

            it(`should be ${structure.isConstructorParameter ? "a" : "not a"} constructor parameter"`, () => {
                assert.equal(definition.isConstructorParameter, structure.isConstructorParameter || false);
            });
        });
    });
}
