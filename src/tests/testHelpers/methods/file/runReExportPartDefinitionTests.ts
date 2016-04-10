import * as assert from "assert";
import {ReExportPartTestStructure} from "./../../testStructures";
import {ReExportPartDefinition} from "./../../../../definitions";
import {runExpressionDefinitionTests} from "./../expressions";
import {ensureNotNull} from "./../../ensureNotNull";

export function runReExportPartDefinitionTests(definition: ReExportPartDefinition, structure: ReExportPartTestStructure) {
    if (structure == null) {
        it(`should be null`, () => {
            assert.equal(definition, null);
        });
    }
    else {
        structure.definitions = structure.definitions || [];
        ensureNotNull(definition, () => {
            it(`should have export name ${structure.exportName}`, () => {
                assert.equal(definition.exportName, structure.exportName);
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
