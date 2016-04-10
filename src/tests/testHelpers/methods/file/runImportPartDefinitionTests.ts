import * as assert from "assert";
import {ImportPartTestStructure} from "./../../testStructures";
import {ImportPartDefinition} from "./../../../../definitions";
import {runExpressionDefinitionTests} from "./../expressions";
import {ensureNotNull} from "./../../ensureNotNull";

export function runImportPartDefinitionTests(definition: ImportPartDefinition, structure: ImportPartTestStructure) {
    if (structure == null) {
        it(`should be null`, () => {
            assert.equal(definition, null);
        });
    }
    else {
        ensureNotNull(definition, () => {
            it(`should have import name ${structure.importName}`, () => {
                assert.equal(definition.importName, structure.importName);
            });

            describe("definitions", () => {
                it(`should have the expected number of definitions`, () => {
                    assert.equal(definition.definitions.length, structure.definitions.length);
                });

                structure.definitions.forEach((structureDefinition, j) => {
                    const definitionDefinition = definition.definitions[j];

                    ensureNotNull(definitionDefinition, () => {
                        it(`should have the name ${structureDefinition.name}`, () => {
                            assert.equal(definitionDefinition.name, structureDefinition.name);
                        });

                        it(`should have a matching type`, () => {
                            assert.equal(definitionDefinition instanceof structureDefinition.type, true);
                        });
                    });
                });
            });

            describe("expression", () => {
                runExpressionDefinitionTests(definition.expression, structure.expression);
            });
        });
    }
}
