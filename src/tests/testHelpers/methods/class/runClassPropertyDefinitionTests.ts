import * as assert from "assert";
import {ClassPropertyTestStructure} from "./../../testStructures";
import {ClassPropertyDefinition, ClassPropertyKind} from "./../../../../definitions";
import {runAbstractableDefinitionTests} from "./../base";
import {runBaseClassPropertyDefinitionTests} from "./base";
import {ensureNotNull} from "./../../ensureNotNull";

export function runClassPropertyDefinitionTests(definition: ClassPropertyDefinition, structure: ClassPropertyTestStructure) {
    describe(`property ${structure.name}`, () => {
        ensureNotNull(definition, () => {
            runBaseClassPropertyDefinitionTests(definition, structure);
            runAbstractableDefinitionTests(definition, structure);

            it(`should have the same kind`, () => {
                assert.equal(definition.kind, structure.kind || ClassPropertyKind.Normal);
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
