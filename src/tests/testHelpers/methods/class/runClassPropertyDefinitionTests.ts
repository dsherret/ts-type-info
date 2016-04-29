import * as assert from "assert";
import {ClassPropertyTestStructure} from "./../../testStructures";
import {ClassPropertyDefinition} from "./../../../../definitions";
import {runBaseClassPropertyDefinitionTests} from "./base";
import {ensureNotNull} from "./../../ensureNotNull";

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

            it(`should be ${structure.isConstructorParameter ? "a" : "not a"} constructor parameter`, () => {
                assert.equal(definition.isConstructorParameter, structure.isConstructorParameter || false);
            });

            it(`should ${structure.hasOnWriteGetBody ? "have" : "not have"} a writeGetBody`, () => {
                assert.equal(definition.onWriteGetBody != null, structure.hasOnWriteGetBody || false);
            });

            it(`should ${structure.hasOnWriteSetBody ? "have" : "not have"} a writeSetBody`, () => {
                assert.equal(definition.onWriteSetBody != null, structure.hasOnWriteSetBody || false);
            });
        });
    });
}
