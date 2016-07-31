import * as assert from "assert";
import {NamedImportPartTestStructure} from "./../../testStructures";
import {NamedImportPartDefinition} from "./../../../../definitions";
import {ensureNotNull} from "./../../ensureNotNull";
import {runExpressionDefinitionTests} from "./../expression";
import {runBaseDefinitionTests} from "./../base";

export function runNamedImportPartDefinitionTests(definition: NamedImportPartDefinition, structure: NamedImportPartTestStructure | undefined) {
    if (structure == null) {
        it(`should be null`, () => {
            assert.equal(definition, null);
        });
    }
    else {
        ensureNotNull(definition, () => {
            structure!.definitions = structure!.definitions || [];

            it(`should have name ${structure!.name}`, () => {
                assert.equal(definition.name, structure!.name);
            });

            it(`should have alias ${structure!.alias}`, () => {
                assert.equal(definition.alias, structure!.alias);
            });

            runBaseDefinitionTests(definition, structure!);

            describe("definitions", () => {
                it(`should have the expected number of definitions`, () => {
                    assert.equal(definition.definitions.length, structure!.definitions!.length);
                });

                structure!.definitions!.forEach((structureDefinition, j) => {
                    const definitionDefinition = definition.definitions[j];

                    ensureNotNull(definitionDefinition, () => {
                        it(`should have the name ${structureDefinition.name}`, () => {
                            assert.equal(definitionDefinition.name, structureDefinition.name);
                        });

                        if (structureDefinition.type != null) {
                            it(`should have a matching type`, () => {
                                assert.equal(definitionDefinition instanceof structureDefinition.type, true);
                            });
                        }
                    });
                });
            });

            describe("expression", () => {
                runExpressionDefinitionTests(definition.expression, structure!.expression);
            });
        });
    }
}
